"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { DitherType, HalftoneSettings, MarkShape } from "@/lib/halftone/types";

interface ControlPanelProps {
  settings: HalftoneSettings;
  setSettings: React.Dispatch<React.SetStateAction<HalftoneSettings>>;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onExportPng: () => void;
  onExportSvg: () => void;
  onStartVideoExport: () => void;
  onStopVideoExport: () => void;
  isVideo: boolean;
  isRecordingVideo: boolean;
}

const MARK_SHAPE_OPTIONS: Array<{ label: string; value: MarkShape }> = [
  { label: "Circle", value: "Circle" },
  { label: "Square", value: "Square" },
  { label: "Triangle", value: "Triangle" },
  { label: "Diamond", value: "Diamond" },
  { label: "Plus (+)", value: "Plus" },
];

const DITHER_OPTIONS: Array<{ label: string; value: DitherType }> = [
  { label: "Jarvis-Judice-Ninke", value: "JarvisJudiceNinke" },
  { label: "Stucki", value: "Stucki" },
  { label: "Burkes", value: "Burkes" },
  { label: "Floyd-Steinberg", value: "FloydSteinberg" },
  { label: "Patterned Ordered", value: "Ordered" },
  { label: "Noise", value: "Noise" },
  { label: "No Extra Texture", value: "None" },
];

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <Slider id={id} min={min} max={max} step={step ?? 1} value={[value]} onValueChange={(entry) => onChange(entry[0] ?? value)} />
    </div>
  );
}

export function ControlPanel({
  settings,
  setSettings,
  onUpload,
  onReset,
  onExportPng,
  onExportSvg,
  onStartVideoExport,
  onStopVideoExport,
  isVideo,
  isRecordingVideo,
}: ControlPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fileUpload">Upload Image / Video</Label>
          <Input id="fileUpload" type="file" accept="image/*,video/*" onChange={onUpload} />
        </div>

        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Primary</h3>
          <SliderField
            id="gridSize"
            label="Grid Size"
            value={settings.gridSize}
            min={5}
            max={50}
            onChange={(value) => setSettings((prev) => ({ ...prev, gridSize: value }))}
          />
          <div className="space-y-2">
            <Label htmlFor="markShape">Mark shape</Label>
            <Select
              value={settings.markShape}
              onValueChange={(value) => setSettings((prev) => ({ ...prev, markShape: value as MarkShape }))}
            >
              <SelectTrigger id="markShape">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MARK_SHAPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Image Adjustments</h3>
          <SliderField
            id="brightness"
            label="Brightness"
            value={settings.brightness}
            min={-100}
            max={100}
            onChange={(value) => setSettings((prev) => ({ ...prev, brightness: value }))}
          />
          <SliderField
            id="contrast"
            label="Contrast"
            value={settings.contrast}
            min={-100}
            max={100}
            onChange={(value) => setSettings((prev) => ({ ...prev, contrast: value }))}
          />
          <SliderField
            id="gamma"
            label="Gamma"
            value={settings.gamma}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setSettings((prev) => ({ ...prev, gamma: Number(value.toFixed(1)) }))}
          />
          <SliderField
            id="smoothing"
            label="Smoothing"
            value={settings.smoothing}
            min={0}
            max={5}
            step={0.5}
            onChange={(value) => setSettings((prev) => ({ ...prev, smoothing: Number(value.toFixed(1)) }))}
          />
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dithering</h3>
          <Select
            value={settings.ditherType}
            onValueChange={(value) => setSettings((prev) => ({ ...prev, ditherType: value as DitherType }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DITHER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Coloring</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={settings.backgroundColor}
                onChange={(event) => setSettings((prev) => ({ ...prev, backgroundColor: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dotColor">Dot Color</Label>
              <Input
                id="dotColor"
                type="color"
                disabled={settings.multicolor}
                value={settings.dotColor}
                onChange={(event) => setSettings((prev) => ({ ...prev, dotColor: event.target.value }))}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <Label htmlFor="multicolor">Multicolor Dots</Label>
            <Switch
              id="multicolor"
              checked={settings.multicolor}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  multicolor: checked,
                  multicolorPalette:
                    prev.multicolorPalette.length >= 2
                      ? prev.multicolorPalette
                      : [...prev.multicolorPalette, "#888888"],
                }))
              }
            />
          </div>
          {settings.multicolor ? (
            <div className="space-y-2 rounded-md border border-border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">
                Colors run from dark regions → light. Reorder stops to change how the gradient maps across the image.
              </p>
              <div className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-1">
                {settings.multicolorPalette.map((hex, index) => (
                  <div key={`palette-row-${index}`} className="flex items-center gap-2">
                    <Input
                      type="color"
                      className="h-9 w-14 shrink-0 cursor-pointer p-1"
                      value={hex}
                      onChange={(event) =>
                        setSettings((prev) => {
                          const next = [...prev.multicolorPalette];
                          next[index] = event.target.value;
                          return { ...prev, multicolorPalette: next };
                        })
                      }
                    />
                    <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">Stop {index + 1}</span>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={index === 0}
                        title="Move up"
                        onClick={() =>
                          setSettings((prev) => {
                            if (index <= 0) return prev;
                            const next = [...prev.multicolorPalette];
                            [next[index - 1], next[index]] = [next[index], next[index - 1]];
                            return { ...prev, multicolorPalette: next };
                          })
                        }
                      >
                        <CaretUpIcon className="size-4" aria-hidden />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={index >= settings.multicolorPalette.length - 1}
                        title="Move down"
                        onClick={() =>
                          setSettings((prev) => {
                            if (index >= prev.multicolorPalette.length - 1) return prev;
                            const next = [...prev.multicolorPalette];
                            [next[index], next[index + 1]] = [next[index + 1], next[index]];
                            return { ...prev, multicolorPalette: next };
                          })
                        }
                      >
                        <CaretDownIcon className="size-4" aria-hidden />
                        <span className="sr-only">Move down</span>
                      </Button>
                    </div>
                    {settings.multicolorPalette.length > 2 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="shrink-0"
                        onClick={() =>
                          setSettings((prev) => ({
                            ...prev,
                            multicolorPalette: prev.multicolorPalette.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    multicolorPalette: [...prev.multicolorPalette, "#9b59b6"],
                  }))
                }
              >
                Add color
              </Button>
            </div>
          ) : null}
        </section>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onExportPng}>Export PNG</Button>
          <Button onClick={onExportSvg}>Export SVG</Button>
          {isVideo ? (
            isRecordingVideo ? (
              <Button className="col-span-2" variant="destructive" onClick={onStopVideoExport}>
                Stop Recording
              </Button>
            ) : (
              <Button className="col-span-2" onClick={onStartVideoExport}>
                Export Video
              </Button>
            )
          ) : null}
        </div>

        <Button variant="secondary" className="w-full" onClick={onReset}>
          Reset All
        </Button>
      </CardContent>
    </Card>
  );
}
