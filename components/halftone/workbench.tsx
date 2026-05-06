"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CanvasStage } from "@/components/halftone/canvas-stage";
import { ControlPanel } from "@/components/halftone/control-panel";
import { PresetBar } from "@/components/halftone/preset-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics/events";
import { drawHalftone, generateSvg } from "@/lib/halftone/generate-halftone";
import {
  DEFAULT_SETTINGS,
  normalizeHalftoneSettings,
  type SavedPreset,
  type SourceType,
  type HalftoneSettings,
} from "@/lib/halftone/types";

const SAVED_PRESET_STORAGE_KEY = "halftone.savedConfigs";

/** Preview cap keeps huge photos responsive; exports still use full resolution. */
const PREVIEW_MAX_LONG_SIDE = 2048;

const DEFAULT_VIDEO_URL = "https://i.imgur.com/5PrJCc2.mp4";

/** Some browsers leave `file.type` empty for valid video files. */
const VIDEO_FILENAME = /\.(mp4|webm|mov|m4v|mkv|ogv)(\?.*)?$/i;

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function randomFileName(ext: string) {
  return `halftone_${Math.floor(Math.random() * 100000)}.${ext}`;
}

export function HalftoneWorkbench() {
  const [settings, setSettings] = useState<HalftoneSettings>(DEFAULT_SETTINGS);
  const [splitPercent, setSplitPercent] = useState(52);
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const raw = window.localStorage.getItem(SAVED_PRESET_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as SavedPreset[];
      return parsed.map((p) => ({
        ...p,
        settings: normalizeHalftoneSettings(p.settings),
      }));
    } catch {
      return [];
    }
  });
  const [presetName, setPresetName] = useState("");
  const [sourceType, setSourceType] = useState<SourceType>("video");
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);

  /** After any user upload, ignore late async load from the default sample video. */
  const userOverrideDefaultVideoRef = useRef(false);

  const settingsRef = useRef(settings);
  const sourceTypeRef = useRef<SourceType>(sourceType);

  useLayoutEffect(() => {
    settingsRef.current = settings;
    sourceTypeRef.current = sourceType;
  }, [settings, sourceType]);

  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const halftoneCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const processFrame = useCallback((forExport = false, scaleFactor = 1) => {
    const halftoneCanvas = halftoneCanvasRef.current;
    const originalCanvas = originalCanvasRef.current;
    if (!halftoneCanvas || !originalCanvas) {
      return null;
    }

    const kind = sourceTypeRef.current;
    const source = kind === "video" ? videoRef.current : imageRef.current;
    if (!source) {
      return null;
    }

    try {
      const result = drawHalftone({
        source,
        targetCanvas: halftoneCanvas,
        settings: settingsRef.current,
        scaleFactor,
        minExportWidth: forExport ? 1920 : 0,
        minExportHeight: forExport ? 1080 : 0,
        maxLongSide: forExport ? undefined : PREVIEW_MAX_LONG_SIDE,
      });

      if (!result) {
        return null;
      }

      originalCanvas.width = result.width;
      originalCanvas.height = result.height;
      const originalCtx = originalCanvas.getContext("2d");
      if (!originalCtx) {
        return null;
      }
      originalCtx.drawImage(source, 0, 0, result.width, result.height);

      return result;
    } catch {
      return null;
    }
  }, []);

  const stopAnimationLoop = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startVideoLoop = useCallback(() => {
    stopAnimationLoop();
    const renderTick = () => {
      processFrame();
      animationFrameRef.current = requestAnimationFrame(renderTick);
    };
    animationFrameRef.current = requestAnimationFrame(renderTick);
  }, [processFrame, stopAnimationLoop]);

  const startVideoLoopRef = useRef(startVideoLoop);
  const stopAnimationLoopRef = useRef(stopAnimationLoop);
  useLayoutEffect(() => {
    startVideoLoopRef.current = startVideoLoop;
    stopAnimationLoopRef.current = stopAnimationLoop;
  }, [startVideoLoop, stopAnimationLoop]);

  const handleMediaSource = useCallback(
    (url: string, type: SourceType) => {
      userOverrideDefaultVideoRef.current = true;

      if (type === "image") {
        stopAnimationLoop();
        sourceTypeRef.current = "image";
        setSourceType("image");
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = url;
        image.onload = () => {
          imageRef.current = image;
          videoRef.current = null;
          sourceTypeRef.current = "image";
          processFrame();
        };
        return;
      }

      stopAnimationLoop();
      const prev = videoRef.current;
      if (prev && prev.src !== url) {
        prev.pause();
        prev.removeAttribute("src");
        try {
          prev.load();
        } catch {
          /* ignore */
        }
      }

      sourceTypeRef.current = "video";
      setSourceType("video");
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.playsInline = true;
      video.muted = true;
      video.loop = true;
      video.src = url;

      let started = false;
      const onReady = async () => {
        if (started) {
          return;
        }
        started = true;
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("canplay", onReady);
        try {
          await video.play();
        } catch {
          /* autoplay policies / codec edge cases */
        }
        videoRef.current = video;
        imageRef.current = null;
        sourceTypeRef.current = "video";
        startVideoLoop();
      };

      video.addEventListener("loadeddata", onReady);
      video.addEventListener("canplay", onReady);
      video.addEventListener(
        "error",
        () => {
          video.removeEventListener("loadeddata", onReady);
          video.removeEventListener("canplay", onReady);
        },
        { once: true },
      );
      try {
        video.load();
      } catch {
        /* ignore */
      }
    },
    [processFrame, startVideoLoop, stopAnimationLoop],
  );

  /** Default sample video once on mount only — never re-run (avoids clobbering user uploads). */
  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.src = DEFAULT_VIDEO_URL;
    video.onloadeddata = async () => {
      if (userOverrideDefaultVideoRef.current) {
        return;
      }
      try {
        await video.play();
      } catch {
        return;
      }
      if (userOverrideDefaultVideoRef.current) {
        return;
      }
      videoRef.current = video;
      imageRef.current = null;
      sourceTypeRef.current = "video";
      startVideoLoopRef.current();
    };
    return () => {
      stopAnimationLoopRef.current();
      video.pause();
      video.removeAttribute("src");
      try {
        video.load();
      } catch {
        /* ignore */
      }
    };
  }, []);

  useEffect(() => {
    if (sourceType === "video" && videoRef.current) {
      startVideoLoop();
    }
  }, [sourceType, startVideoLoop]);

  useEffect(() => {
    if (sourceType !== "image" || !imageRef.current) {
      return;
    }
    const id = window.setTimeout(() => {
      processFrame();
    }, 100);
    return () => clearTimeout(id);
  }, [settings, sourceType, processFrame]);

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    if (file.type.startsWith("video/") || VIDEO_FILENAME.test(file.name)) {
      handleMediaSource(fileUrl, "video");
      trackEvent("upload_media", { type: "video" });
      return;
    }
    handleMediaSource(fileUrl, "image");
    trackEvent("upload_media", { type: "image" });
  };

  const handleSavePreset = () => {
    const nextPreset: SavedPreset = {
      id: crypto.randomUUID(),
      name: presetName.trim() || `Preset ${savedPresets.length + 1}`,
      settings,
      createdAt: new Date().toISOString(),
    };
    const nextPresets = [nextPreset, ...savedPresets].slice(0, 24);
    setSavedPresets(nextPresets);
    setPresetName("");
    window.localStorage.setItem(SAVED_PRESET_STORAGE_KEY, JSON.stringify(nextPresets));
    trackEvent("save_local_config", { name: nextPreset.name });
  };

  const handleDeletePreset = (id: string) => {
    const nextPresets = savedPresets.filter((preset) => preset.id !== id);
    setSavedPresets(nextPresets);
    window.localStorage.setItem(SAVED_PRESET_STORAGE_KEY, JSON.stringify(nextPresets));
  };

  const exportPng = () => {
    const source = sourceType === "video" ? videoRef.current : imageRef.current;
    if (!source) {
      return;
    }
    const exportCanvas = document.createElement("canvas");
    const result = drawHalftone({
      source,
      targetCanvas: exportCanvas,
      settings,
      scaleFactor: 2,
      minExportWidth: 1920,
      minExportHeight: 1080,
    });
    if (!result) {
      return;
    }
    exportCanvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      downloadBlob(blob, randomFileName("png"));
      trackEvent("export_png");
    }, "image/png");
  };

  const exportSvg = () => {
    const source = sourceType === "video" ? videoRef.current : imageRef.current;
    if (!source) {
      return;
    }
    const exportCanvas = document.createElement("canvas");
    const result = drawHalftone({
      source,
      targetCanvas: exportCanvas,
      settings,
      scaleFactor: 2,
      minExportWidth: 1920,
      minExportHeight: 1080,
    });
    if (!result) {
      return;
    }
    const svgContent = generateSvg(result, settings);
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    downloadBlob(blob, randomFileName("svg"));
    trackEvent("export_svg");
  };

  const startVideoExport = () => {
    const canvas = halftoneCanvasRef.current;
    if (!canvas || sourceType !== "video") {
      return;
    }
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9",
      videoBitsPerSecond: 5_000_000,
    });
    mediaRecorderRef.current = recorder;
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      downloadBlob(blob, randomFileName("webm"));
      setIsRecordingVideo(false);
      trackEvent("export_video");
    };

    recorder.start();
    setIsRecordingVideo(true);
  };

  const stopVideoExport = () => {
    mediaRecorderRef.current?.stop();
  };

  return (
    <section className="halftone-workbench-shell rounded-lg border border-border bg-background/40 p-4 md:p-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start xl:gap-6">
        <div className="space-y-6">
          <ControlPanel
            settings={settings}
            setSettings={setSettings}
            onUpload={handleUpload}
            onReset={() => setSettings(DEFAULT_SETTINGS)}
            onExportPng={exportPng}
            onExportSvg={exportSvg}
            onStartVideoExport={startVideoExport}
            onStopVideoExport={stopVideoExport}
            isVideo={sourceType === "video"}
            isRecordingVideo={isRecordingVideo}
          />
          <Card className="shrink-0">
            <CardHeader>
              <CardTitle>Presets</CardTitle>
              <CardDescription>Built-in looks and configs saved in this browser.</CardDescription>
            </CardHeader>
            <CardContent>
              <PresetBar
                savedPresets={savedPresets}
                presetName={presetName}
                onPresetNameChange={setPresetName}
                onSavePreset={handleSavePreset}
                onApplySettings={(next) => {
                  setSettings(normalizeHalftoneSettings(next));
                  trackEvent("apply_template");
                }}
                onDeletePreset={handleDeletePreset}
              />
            </CardContent>
          </Card>
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Split View Inspector</CardTitle>
              <CardDescription>Compare original media with processed halftone output in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <CanvasStage
                originalCanvasRef={originalCanvasRef}
                halftoneCanvasRef={halftoneCanvasRef}
                splitPercent={splitPercent}
                onSplitChange={setSplitPercent}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
