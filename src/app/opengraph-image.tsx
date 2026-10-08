import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/content";

export const alt = `${PROFILE.name}, AI Engineer. I build AI that survives production.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* the share card: the hero line, the red full stop, the numbers that back it */
export default async function OG() {
  const [black, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/TASAOrbiter-800.ttf")),
    readFile(join(process.cwd(), "assets/TASAOrbiter-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#faf8f5",
          color: "#1a1514",
          fontFamily: "Orbiter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: "#ff2800", fontSize: 26, fontWeight: 800, letterSpacing: -1 }}>AG</div>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>{PROFILE.name}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 800, lineHeight: 0.88, letterSpacing: -6.5 }}>
            <span>I build AI</span>
            <span>that survives</span>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <span>production</span>
              <div style={{ width: 22, height: 22, background: "#ff2800", marginLeft: 6, marginBottom: 14 }} />
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: "#3f3835" }}>
            AI Engineer · LLM agents, RAG, voice and vision in explosives, defence & aerospace
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 36, width: 330, background: "#ff2800", padding: "0 48px" }}>
          {[
            { v: "350+", l: "cameras running my models" },
            { v: "<300", l: "daily violations, from ~8,000" },
            { v: "6", l: "agents in Roost, live" },
          ].map((s) => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 76, fontWeight: 800, letterSpacing: -4, color: "#fff", lineHeight: 1 }}>{s.v}</span>
              <span style={{ fontSize: 22, fontWeight: 500, color: "#000", marginTop: 6 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Orbiter", data: black, weight: 800, style: "normal" },
        { name: "Orbiter", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
