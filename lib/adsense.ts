/** Google AdSense publisher ID (data-ad-client / script client=). */
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-4524750683541633";

/** Default “Responsive” unit (7285338195). Override with `NEXT_PUBLIC_AD_SLOT_TOP`. */
export const ADSENSE_SLOT_RESPONSIVE = "7285338195";

/** Default “Bottom banner” unit (6564476404). Override with `NEXT_PUBLIC_AD_SLOT_INLINE`. */
export const ADSENSE_SLOT_BOTTOM_BANNER = "6564476404";
