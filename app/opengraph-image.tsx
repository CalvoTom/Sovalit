import { ImageResponse } from "next/og";

export const alt = "Sovalit — Le digital qui fait grandir votre entreprise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image d'aperçu générée pour les partages (LinkedIn, Slack, WhatsApp…)
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#ffffff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -260, top: -120, width: 820, height: 820, borderRadius: 9999, border: "170px solid #0079e0", borderRightColor: "transparent", transform: "rotate(25deg)" }} />
        <div style={{ fontSize: 64, fontWeight: 800, color: "#0079e0", letterSpacing: -4 }}>SovaliT</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#1d2133", lineHeight: 1.02, letterSpacing: -3 }}>Le digital qui fait grandir votre entreprise.</div>
          <div style={{ fontSize: 28, color: "#5a6078", marginTop: 24 }}>Sites vitrines · Apps mobiles · Outils internes · Data & IA</div>
        </div>
      </div>
    ),
    size
  );
}
