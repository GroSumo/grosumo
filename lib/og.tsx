import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#0F172A";
const SLATE = "#475569";
const BRANDINK = "#0870B8";
const SOFT = "#E6F5FE";
const SUBLINE = "Offline: free software + ₹1,999/yr AMC · Cloud: ₹9,999/yr";

/** Fetches a Google font subset (TTF) for Satori. Returns null offline so the image still renders with the default font. */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/**
 * Shared 1200×630 social card: white background, logo tile, headline, pricing subline.
 * With `eyebrow` + `title` it renders a page title (guides, /for pages) on the same template.
 */
export async function renderOgImage({ eyebrow, title }: { eyebrow?: string; title?: string } = {}) {
  const logo = await readFile(path.join(process.cwd(), "public", "logo.png"), "base64");
  const headline = title ?? "GST billing, stock & accounts — cloud or offline";
  const allText = `grosumoERP ${eyebrow ?? ""} ${headline} ${SUBLINE} www.grosumo.com`;

  const [bold, medium] = await Promise.all([googleFont("Inter", 800, allText), googleFont("Inter", 500, allText)]);
  const fonts = [
    ...(bold ? [{ name: "Inter", data: bold, weight: 800 as const, style: "normal" as const }] : []),
    ...(medium ? [{ name: "Inter", data: medium, weight: 500 as const, style: "normal" as const }] : []),
  ];

  // Satori doesn't flow mixed-style text, so the headline is laid out word by word in a wrapping row;
  // on the default headline, the words after " — " take the accent colour.
  const [lead, accent = ""] = title ? [headline] : headline.split(" — ");
  const words = [
    ...`${lead}${accent ? " —" : ""}`.split(" ").map(w => ({ w, accent: false })),
    ...(accent ? accent.split(" ").map(w => ({ w, accent: true })) : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#FFFFFF", fontFamily: "Inter" }}>
        <div style={{ position: "absolute", right: -160, top: -160, width: 560, height: 560, borderRadius: 9999, background: SOFT, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
            <img src={`data:image/png;base64,${logo}`} width={88} height={88} style={{ borderRadius: 22 }} alt="" />
            <span style={{ fontSize: 40, fontWeight: 800, color: INK, letterSpacing: -1 }}>grosumoERP</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
            {eyebrow && <span style={{ fontSize: 26, fontWeight: 500, color: BRANDINK, marginBottom: 14 }}>{eyebrow}</span>}
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: title ? 60 : 68, fontWeight: 800, color: INK, letterSpacing: -2.4, lineHeight: 1.06 }}>
              {words.map(({ w, accent: isAccent }, i) => (
                <span key={i} style={{ marginRight: "0.24em", color: isAccent ? BRANDINK : INK }}>
                  {w}
                </span>
              ))}
            </div>
            <span style={{ marginTop: 26, fontSize: 30, fontWeight: 500, color: SLATE }}>{SUBLINE}</span>
          </div>

          <span style={{ fontSize: 26, fontWeight: 500, color: BRANDINK }}>www.grosumo.com</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
