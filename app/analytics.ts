export type ConversionEvent =
  | "hero_cta_click"
  | "pricing_cta_click"
  | "form_start"
  | "form_completion"
  | "form_abandonment";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: ConversionEvent, details: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    event_category: "conversion",
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...details,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("metaphor:analytics", { detail: payload }));
}
