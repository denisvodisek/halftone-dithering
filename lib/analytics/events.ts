export type HalftoneEvent =
  | "upload_media"
  | "export_png"
  | "export_svg"
  | "export_video"
  | "apply_template"
  | "save_local_config";

export function trackEvent(event: HalftoneEvent, payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Replace this with your analytics SDK binding (PostHog, GA4, etc).
  // Keeping this function centralized prevents event name drift.
  void { event, payload };
}
