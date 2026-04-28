"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  /** AdSense `data-ad-slot` value. */
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  /** Accessible name for the ad region (e.g. “Bottom banner”). */
  name: string;
}

export function AdSlot({ slot, format = "auto", className, name }: AdSlotProps) {
  const trimmed = slot.trim();
  const ready = trimmed.length > 0;

  useEffect(() => {
    if (!ready) {
      return;
    }
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore ad init failures in development environments.
    }
  }, [ready, trimmed]);

  if (!ready) {
    return (
      <aside
        aria-label={name}
        className={`flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-xs text-muted-foreground ${className ?? ""}`}
      >
        <span className="text-center">Ad slot not configured — set <code className="text-[0.8rem]">NEXT_PUBLIC_AD_SLOT_*</code></span>
      </aside>
    );
  }

  return (
    <aside aria-label={name} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "96px" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={trimmed}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
