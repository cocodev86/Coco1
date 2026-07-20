import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const alt = `${brand.shortName} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.colors.ink,
          color: brand.colors.white,
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: brand.colors.violet,
              color: brand.colors.lime,
              fontSize: 46,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>{brand.shortName}</span>
            <span style={{ fontSize: 22, color: brand.colors.lime }}>{brand.tagline}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 70, lineHeight: 1.05, fontWeight: 800 }}>
            AI automation and digital systems for growing businesses.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "#D9DAE2" }}>
            Landing pages, lead capture, booking automation, and connected operating systems.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#B9BBC7" }}>
          <span>Metaphor Automation Consulting</span>
          <span>metaphor.dev</span>
        </div>
      </div>
    ),
    size,
  );
}
