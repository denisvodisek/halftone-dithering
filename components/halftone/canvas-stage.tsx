"use client";

import { Slider } from "@/components/ui/slider";

interface CanvasStageProps {
  originalCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  halftoneCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  splitPercent: number;
  onSplitChange: (value: number) => void;
}

export function CanvasStage({
  originalCanvasRef,
  halftoneCanvasRef,
  splitPercent,
  onSplitChange,
}: CanvasStageProps) {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <canvas ref={originalCanvasRef} className="h-auto w-full" />
        <canvas
          ref={halftoneCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
        />
        <div
          className="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-primary/70"
          style={{ left: `${splitPercent}%` }}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          Split View: {Math.round(splitPercent)}% processed / {Math.round(100 - splitPercent)}% original
        </p>
        <Slider value={[splitPercent]} min={0} max={100} step={1} onValueChange={(value) => onSplitChange(value[0] ?? 50)} />
      </div>
    </div>
  );
}
