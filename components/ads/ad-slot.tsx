"use client";

import { useEffect } from "react";
import Script from "next/script";

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
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!adClient) {
      return;
    }
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore ad init failures in development environments.
    }
  }, [adClient, slot]);

  if (!adClient) {
    return (
      <div
        className={`flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-xs text-muted-foreground ${className ?? ""}`}
      >
        Ad slot placeholder ({slot})
      </div>
    );
  }

  return (
    <>
      <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`} crossOrigin="anonymous" strategy="afterInteractive" />
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "96px" }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </>
  );
}
