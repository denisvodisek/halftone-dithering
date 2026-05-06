"use client";

import { useCallback, useRef } from "react";
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
  const stageRef = useRef<HTMLDivElement>(null);

  const updateSplitFromClientX = useCallback(
    (clientX: number) => {
      const el = stageRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) {
        return;
      }
      const x = clientX - rect.left;
      const pct = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      onSplitChange(pct);
    },
    [onSplitChange],
  );

  const onHandlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSplitFromClientX(event.clientX);
  };

  const onHandlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    updateSplitFromClientX(event.clientX);
  };

  const onHandlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={stageRef}
        className="relative overflow-hidden rounded-lg border border-border bg-card"
      >
        <canvas ref={originalCanvasRef} className="h-auto w-full" />
        <canvas
          ref={halftoneCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
        />
        <div
          className="absolute bottom-0 top-0 z-10 flex w-3 -translate-x-1/2 cursor-ew-resize touch-none items-stretch justify-center select-none"
          style={{ left: `${splitPercent}%` }}
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
          role="separator"
          aria-orientation="vertical"
          aria-valuenow={Math.round(splitPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Drag to adjust split between original and halftone preview"
        >
          <div className="w-0.5 shrink-0 bg-primary shadow-sm ring-1 ring-primary/20" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          Split: {Math.round(splitPercent)}% halftone / {Math.round(100 - splitPercent)}% original — drag the line on the
          preview or use the slider.
        </p>
        <Slider value={[splitPercent]} min={0} max={100} step={1} onValueChange={(value) => onSplitChange(value[0] ?? 50)} />
      </div>
    </div>
  );
}
