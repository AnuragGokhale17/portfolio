/**
 * One looping illustration per system. Pure CSS keyframes (see globals.css),
 * paused by the parent while the tile is off screen. `onRed` flips the
 * palette for the red tiles.
 */

type ArtProps = { onRed?: boolean };

/* on red: black lines and white highlights, so small labels stay readable */
const ink = (r?: boolean) => (r ? "#000" : "var(--color-ink)");
const accent = (r?: boolean) => (r ? "#fff" : "var(--color-red)");
const soft = (r?: boolean) => (r ? "rgba(0,0,0,.28)" : "var(--color-line-hi)");

function Agents({ onRed }: ArtProps) {
  const lines = [
    { t: "model  decides which tool", c: ink(onRed) },
    { t: "call   internal API", c: ink(onRed) },
    { t: "←      result", c: "var(--color-ink-3)" },
    { t: "call   database", c: ink(onRed) },
    { t: "done   task executed", c: accent(onRed) },
  ];
  return (
    <div className="num flex h-full flex-col justify-center gap-1.5 px-6 text-[0.75rem]">
      {lines.map((l, i) => (
        <span key={i} style={{ color: l.c, animation: `rise 5s ${i * 0.55}s ease-out infinite both` }}>{l.t}</span>
      ))}
    </div>
  );
}

function Roost({ onRed }: ArtProps) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-x-6 top-1/2 h-px" style={{ background: soft(onRed) }} />
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full"
          style={{
            left: `${8 + i * 10}%`,
            background: ink(onRed),
            animation: `roostgo 4.8s ${i * 0.7}s cubic-bezier(.5,0,.3,1) infinite both`,
          }}
        />
      ))}
      <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
        <span className="grid size-11 place-items-center rounded-xl border-2" style={{ borderColor: ink(onRed) }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 9.5l4 4L15 5" fill="none" stroke={ink(onRed)} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 20, ["--len" as string]: 20, animation: "draw 2.4s ease-in-out infinite" }} /></svg>
        </span>
        <span className="tag" style={{ color: ink(onRed), animation: "blink 1.2s steps(2) infinite" }}>your yes</span>
      </div>
      <style>{`@keyframes roostgo{0%{left:1.5rem;opacity:0}10%{opacity:1}70%{left:calc(100% - 5.25rem);opacity:1}78%,100%{left:calc(100% - 5.25rem);opacity:0}}`}</style>
    </div>
  );
}

function Voice({ onRed }: ArtProps) {
  return (
    <div className="flex h-full items-center justify-center gap-6">
      <div className="flex h-16 items-center gap-[5px]">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="w-[5px] origin-center rounded-full"
            style={{ height: `${30 + ((i * 37) % 70)}%`, background: i % 4 === 1 ? accent(onRed) : ink(onRed), animation: `eq ${0.7 + (i % 5) * 0.18}s ${i * 0.07}s ease-in-out infinite` }}
          />
        ))}
      </div>
      <div className="relative h-7 w-12 overflow-hidden rounded-full border-2" style={{ borderColor: ink(onRed) }}>
        <div className="flex flex-col" style={{ animation: "lang 3.6s steps(1) infinite" }}>
          {["HI", "EN"].map((l) => (
            <span key={l} className="tag grid h-[24px] place-items-center font-bold" style={{ color: ink(onRed) }}>{l}</span>
          ))}
        </div>
      </div>
      <style>{`@keyframes lang{0%{transform:translateY(0)}50%{transform:translateY(-24px)}}`}</style>
    </div>
  );
}

function Telemetry({ onRed }: ArtProps) {
  const d = "M0 70 L22 62 L44 66 L66 40 L88 48 L110 28 L132 36 L154 16 L176 24 L198 10";
  return (
    <div className="relative grid h-full place-items-center">
      <svg viewBox="-6 0 212 84" className="h-24 w-[78%] overflow-visible">
        {[20, 45, 70].map((y) => <line key={y} x1={0} x2={198} y1={y} y2={y} stroke={soft(onRed)} strokeDasharray="2 4" />)}
        <path d={d} fill="none" stroke={accent(onRed)} strokeWidth={2.5} strokeLinejoin="round" style={{ strokeDasharray: 280, ["--len" as string]: 280, animation: "draw 3.2s ease-out infinite" }} />
      </svg>
      <span className="tag absolute right-5 top-4 flex items-center gap-1.5 rounded-full border px-2.5 py-1" style={{ color: ink(onRed), borderColor: soft(onRed) }}>
        <svg width="10" height="11" viewBox="0 0 10 11"><rect x="1" y="5" width="8" height="6" rx="1.5" fill={ink(onRed)} /><path d="M3 5V3.5a2 2 0 014 0V5" fill="none" stroke={ink(onRed)} strokeWidth="1.4" /></svg>
        role: supervisor
      </span>
    </div>
  );
}

function VLM({ onRed }: ArtProps) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-6">
      <div className="relative grid grid-cols-4 gap-1.5 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="aspect-[4/3] rounded-[4px] border"
            style={{
              borderColor: soft(onRed),
              background: i === 5 ? (onRed ? "#fff" : "var(--color-red-pale)") : "transparent",
              outline: i === 5 ? `2px solid ${accent(onRed)}` : undefined,
              animation: i === 5 ? "blink 1.6s steps(2) infinite" : undefined,
            }}
          />
        ))}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-red/70 mix-blend-multiply" style={{ animation: "scan 2.4s linear infinite" }} />
      </div>
      <span className="num truncate text-[0.75rem]" style={{ color: ink(onRed) }}>
        ask in plain language<span style={{ animation: "blink 1s steps(2) infinite" }}>▍</span>
      </span>
    </div>
  );
}

function SiteGen({ onRed }: ArtProps) {
  const blocks = [
    "col-span-6 h-3",
    "col-span-4 h-9",
    "col-span-2 h-9",
    "col-span-2 h-7",
    "col-span-2 h-7",
    "col-span-2 h-7",
  ];
  return (
    <div className="grid h-full place-items-center">
      <div className="grid w-[62%] grid-cols-6 gap-1.5 rounded-lg border p-2" style={{ borderColor: soft(onRed) }}>
        {blocks.map((b, i) => (
          <span key={i} className={`${b} rounded-[3px]`} style={{ background: i === 1 ? accent(onRed) : soft(onRed), animation: `rise 4.2s ${i * 0.32}s ease-out infinite both` }} />
        ))}
      </div>
    </div>
  );
}

function Person({ x, ok, onRed, delay }: { x: string; ok: boolean; onRed?: boolean; delay: number }) {
  const c = ink(onRed);
  return (
    <div className="absolute bottom-5" style={{ left: x }}>
      <svg width="44" height="88" viewBox="0 0 44 88">
        {ok && <path d="M9 18a13 11 0 0126 0z" fill={accent(onRed)} />}
        <circle cx="22" cy="20" r="9" fill={c} />
        <path d="M8 88V44a14 14 0 0128 0v44z" fill={c} />
        {ok && <rect x="11" y="44" width="22" height="5" fill={accent(onRed)} />}
      </svg>
      <span
        className="absolute -inset-2 rounded-sm border-2"
        style={{ borderColor: ok ? ink(onRed) : accent(onRed), borderStyle: ok ? "solid" : "dashed", animation: `snap 3.4s ${delay}s ease-out infinite both` }}
      >
        <span className="tag absolute -top-5 left-[-2px] whitespace-nowrap px-1 text-[0.5625rem]" style={{ background: ok ? ink(onRed) : accent(onRed), color: onRed ? (ok ? "#fff" : "#000") : "#fff" }}>
          {ok ? "helmet" : "no helmet"}
        </span>
      </span>
    </div>
  );
}

function PPE({ onRed }: ArtProps) {
  return (
    <div className="relative h-full">
      <Person x="24%" ok onRed={onRed} delay={0.2} />
      <Person x="60%" ok={false} onRed={onRed} delay={0.9} />
    </div>
  );
}

function ANPR({ onRed }: ArtProps) {
  const plate = ["M", "H", "3", "1", "·", "A", "B", "·", "4", "2", "0", "7"];
  return (
    <div className="grid h-full place-items-center">
      <div className="relative flex items-center gap-[2px] rounded-md border-2 bg-white px-2.5 py-1.5" style={{ borderColor: ink(onRed) }}>
        {plate.map((ch, i) => (
          <span key={i} className="num relative h-[1.5rem] w-[0.85rem] overflow-hidden text-center text-[1.15rem] font-bold leading-[1.5rem] text-ink">
            <span className="absolute inset-x-0 top-0 flex flex-col" style={{ animation: `roll 3s ${i * 0.08}s cubic-bezier(.2,.7,.2,1) infinite both` }}>
              {[ch, "6", "Q", "0", "B", "8"].map((c, j) => <span key={j}>{ch === "·" ? "·" : c}</span>)}
            </span>
          </span>
        ))}
        <span className="pointer-events-none absolute -inset-3 rounded-lg border-2 border-dashed" style={{ borderColor: accent(onRed), animation: "snap 3s ease-out infinite both" }} />
      </div>
    </div>
  );
}

export const ART: Record<string, (p: ArtProps) => React.ReactElement> = {
  agents: Agents,
  roost: Roost,
  "voice-rag": Voice,
  "smart-factory": Telemetry,
  vlm: VLM,
  "site-gen": SiteGen,
  ppe: PPE,
  anpr: ANPR,
};
