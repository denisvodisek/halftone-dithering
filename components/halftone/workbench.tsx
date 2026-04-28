"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const halftoneCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const processFrame = useCallback(
    (forExport = false, scaleFactor = 1) => {
      const halftoneCanvas = halftoneCanvasRef.current;
      const originalCanvas = originalCanvasRef.current;
      if (!halftoneCanvas || !originalCanvas) {
        return null;
      }

      const source = sourceType === "video" ? videoRef.current : imageRef.current;
      if (!source) {
        return null;
      }

      const outputWidth =
        source instanceof HTMLVideoElement
          ? source.videoWidth
          : source.naturalWidth || source.width;
      const outputHeight =
        source instanceof HTMLVideoElement
          ? source.videoHeight
          : source.naturalHeight || source.height;

      originalCanvas.width = outputWidth;
      originalCanvas.height = outputHeight;
      const originalCtx = originalCanvas.getContext("2d");
      if (!originalCtx) {
        return null;
      }
      originalCtx.drawImage(source, 0, 0, outputWidth, outputHeight);

      const result = drawHalftone({
        source,
        targetCanvas: halftoneCanvas,
        settings,
        scaleFactor,
        minExportWidth: forExport ? 1920 : 0,
        minExportHeight: forExport ? 1080 : 0,
      });

      return result;
    },
    [settings, sourceType],
  );

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

  const handleMediaSource = useCallback(
    (url: string, type: SourceType) => {
      if (type === "image") {
        stopAnimationLoop();
        setSourceType("image");
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = url;
        image.onload = () => {
          imageRef.current = image;
          videoRef.current = null;
          processFrame();
        };
        return;
      }

      setSourceType("video");
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.playsInline = true;
      video.muted = true;
      video.loop = true;
      video.src = url;
      video.onloadeddata = async () => {
        await video.play();
        videoRef.current = video;
        imageRef.current = null;
        startVideoLoop();
      };
    },
    [processFrame, startVideoLoop, stopAnimationLoop],
  );

  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.src = "https://i.imgur.com/5PrJCc2.mp4";
    video.onloadeddata = async () => {
      await video.play();
      videoRef.current = video;
      imageRef.current = null;
      startVideoLoop();
    };
    return () => stopAnimationLoop();
  }, [startVideoLoop, stopAnimationLoop]);

  useEffect(() => {
    if (sourceType === "video" && videoRef.current) {
      startVideoLoop();
      return;
    }
    if (sourceType === "image" && imageRef.current) {
      processFrame();
    }
  }, [processFrame, sourceType, startVideoLoop]);

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    if (file.type.startsWith("video/")) {
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
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr] xl:items-start">
      <div className="space-y-6 xl:sticky xl:top-6 xl:z-10 xl:max-h-[min(100vh-1.5rem,1200px)] xl:overflow-y-auto xl:overflow-x-hidden xl:pr-1 xl:pb-8">
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

      <div className="space-y-6">
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
  );
}
