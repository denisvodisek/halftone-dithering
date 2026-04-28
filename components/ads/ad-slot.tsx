"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";

/** Default placeholders from layout until real `NEXT_PUBLIC_AD_SLOT_*` values are set in AdSense. */
const DEMO_AD_SLOTS = new Set(["1111111111", "2222222222", "3333333333"]);

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

export function AdSlot({ slot, format = "auto", className }: AdSlotProps) {
  const usePlaceholder = DEMO_AD_SLOTS.has(slot);

  useEffect(() => {
    if (usePlaceholder) {
      return;
    }
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore ad init failures in development environments.
    }
  }, [usePlaceholder, slot]);

  if (usePlaceholder) {
    return (
      <div
        className={`flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-xs text-muted-foreground ${className ?? ""}`}
      >
        Ad slot placeholder ({slot})
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", minHeight: "96px" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
