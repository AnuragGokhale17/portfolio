"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { INTRO, PROFILE } from "@/lib/content";

/* ------------------------------------------------------------------
   The orbit: a small neural network at the centre, running forward
   passes. Around it, the AI/ML work it powers (outer ring) and the
   techniques underneath (inner ring, turning the other way). Every
   label is something shipped; see content.ts. Chips counter-rotate so
   their labels stay upright.
   ------------------------------------------------------------------ */

const OUTER = [
  { t: "RAG", s: "retrieval" },
  { t: "Agents", s: "orchestration" },
  { t: "Tool calling", s: "function calls" },
  { t: "VLMs", s: "vision + language" },
  { t: "Voice AI", s: "STT / TTS" },
  { t: "YOLO", s: "detection" },
];
const INNER = ["Embeddings", "Re-ID", "Anomaly"];
/* sized so the two counter-rotating rings can never overlap:
   inner chips reach at most RI + 43, outer chips come in to at most R - 68 */
const R = 208;
const RI = 91;
const CORE = 54;

/* a 3-4-2 network drawn inside the core */
const LAYERS = [
  [-18, 0, 18].map((y) => ({ x: -27, y })),
  [-24, -8, 8, 24].map((y) => ({ x: 0, y })),
  [-11, 11].map((y) => ({ x: 27, y })),
];
const EDGES = LAYERS.slice(0, -1).flatMap((layer, li) =>
  layer.flatMap((a) => LAYERS[li + 1].map((b) => ({ a, b })))
);
/* the routes a forward pass takes, input to output */
const PASSES = [
  [LAYERS[0][0], LAYERS[1][1], LAYERS[2][0]],
  [LAYERS[0][2], LAYERS[1][2], LAYERS[2][1]],
  [LAYERS[0][1], LAYERS[1][0], LAYERS[2][1]],
  [LAYERS[0][1], LAYERS[1][3], LAYERS[2][0]],
];

function Core({ still }: { still: boolean | null }) {
  return (
    <g>
      <circle r={CORE + 14} fill="var(--color-red)" opacity={0.12} />
      <circle r={CORE} fill="var(--color-red)" />
      {EDGES.map(({ a, b }, i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fff" strokeOpacity={0.35} strokeWidth={1} />
      ))}
      {LAYERS.map((layer, li) =>
        layer.map((n, ni) => (
          <circle key={`${li}-${ni}`} cx={n.x} cy={n.y} r={4} fill="#fff">
            {!still && (
              <animate
                attributeName="r"
                values="4;5.6;4"
                dur="1.8s"
                begin={`${li * 0.3 + ni * 0.07}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))
      )}
      {!still &&
        PASSES.map((pts, i) => (
          <circle key={i} r={2.6} fill="#000">
            <animateMotion
              dur="1.8s"
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
              path={`M ${pts.map((q) => `${q.x} ${q.y}`).join(" L ")}`}
            />
          </circle>
        ))}
    </g>
  );
}

function Orbit() {
  const still = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[540px] [perspective:900px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.5 }}
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        <svg viewBox="-280 -280 560 560" className="absolute inset-0 size-full overflow-visible">
          {/* rings */}
          <circle r={R} fill="none" stroke="var(--color-line-hi)" strokeDasharray="2 7" />
          <circle r={RI} fill="none" stroke="var(--color-line-hi)" />
          <circle r={262} fill="none" stroke="var(--color-line)" strokeDasharray="1 11" />

          {/* outer ring: what the model powers */}
          <g style={{ animation: "spin 90s linear infinite", transformOrigin: "0 0" }}>
            {OUTER.map((c, i) => {
              const a = (i / OUTER.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(a) * R, y = Math.sin(a) * R;
              const x0 = Math.cos(a) * (CORE + 4), y0 = Math.sin(a) * (CORE + 4);
              const w = Math.max(c.t.length * 9.6, c.s.length * 6.3) + 28;
              return (
                <g key={c.t}>
                  <line x1={x0} y1={y0} x2={x} y2={y} stroke="var(--color-line-hi)" strokeWidth={1} />
                  {/* one signal flowing in to the model, unhurried */}
                  {!still && (
                    <circle r={3.5} fill="var(--color-red)">
                      <animateMotion dur={`${3.4 + (i % 3) * 0.6}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" path={`M ${x} ${y} L ${x0} ${y0}`} />
                    </circle>
                  )}
                  <g transform={`translate(${x} ${y})`}>
                    <g style={{ animation: "spin 90s linear infinite reverse", transformOrigin: "0 0" }}>
                      <rect x={-w / 2} y={-23} width={w} height={46} rx={23} fill="var(--color-white)" stroke="var(--color-ink)" strokeWidth={1.5} />
                      <text textAnchor="middle" y={-2} fontSize="15" fontWeight="800" fill="var(--color-ink)" style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}>{c.t}</text>
                      <text textAnchor="middle" y={13} fontSize="9" fontWeight="600" fill="var(--color-ink-3)" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.s}</text>
                    </g>
                  </g>
                </g>
              );
            })}
          </g>

          {/* inner ring: the techniques underneath, turning the other way */}
          <g style={{ animation: "spin 60s linear infinite reverse", transformOrigin: "0 0" }}>
            {INNER.map((t, i) => {
              const a = (i / INNER.length) * Math.PI * 2 + Math.PI / 6;
              const x = Math.cos(a) * RI, y = Math.sin(a) * RI;
              const w = t.length * 6.8 + 18;
              return (
                <g key={t} transform={`translate(${x} ${y})`}>
                  <g style={{ animation: "spin 60s linear infinite", transformOrigin: "0 0" }}>
                    <rect x={-w / 2} y={-12} width={w} height={24} rx={12} fill="var(--color-ink)" />
                    <text textAnchor="middle" dy="0.35em" fontSize="10" fontWeight="600" fill="#fff" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>{t}</text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* the model: a network running forward passes */}
          <Core still={still} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* a sticker that floats bottom-right once you scroll past the hero,
   and steps aside when the contact section is on screen */
export function FloatingBadge() {
  const text = "Available for work · Open to AI roles · ";
  const [atContact, setAtContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 520));

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {scrolled && !atContact && (
    <motion.a
      href="#contact"
      className="fixed bottom-4 right-4 z-40 grid size-[76px] place-items-center rounded-full bg-ink text-white shadow-[0_8px_24px_rgba(26,21,20,0.25)] sm:bottom-6 sm:right-6 sm:size-[112px]"
      whileHover={{ scale: 1.08, rotate: 8 }}
      whileTap={{ scale: 0.94 }}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0, transition: { type: "spring", stiffness: 160, damping: 12 } }}
      exit={{ scale: 0, rotate: 90, transition: { duration: 0.25 } }}
      aria-label="Available for work. Jump to contact."
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" style={{ animation: "spin 28s linear infinite" }} aria-hidden>
        <defs><path id="ring" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
        <text fontSize="8.6" fill="#fff" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <textPath href="#ring">{text}</textPath>
        </text>
      </svg>
      <span className="relative size-3 rounded-full bg-red" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-red" style={{ animation: "ping 2.4s ease-out infinite" }} />
      </span>
    </motion.a>
      )}
    </AnimatePresence>
  );
}

export function Hero() {
  let w = 0;
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* soft graph-paper backdrop, faded at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_35%,#000_30%,transparent_75%)] opacity-70"
      />

      <div className="relative mx-auto max-w-[1320px] px-gutter">
        <motion.div
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="tag rounded-full bg-red px-3 py-1.5 text-black">{PROFILE.role}</span>
          <span className="tag rounded-full border border-line-hi bg-white px-3 py-1.5 text-ink-2">{PROFILE.industry}</span>
          <span className="tag rounded-full border border-line-hi bg-white px-3 py-1.5 text-ink-2">{PROFILE.location}</span>
        </motion.div>

        <div className="grid items-center gap-x-6 gap-y-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:pb-24">
          <div>
            <h1 className="font-extrabold leading-[0.86] tracking-[-0.058em] text-[clamp(3.3rem,8.2vw,8.5rem)]">
              {INTRO.lines.map((line, li) => (
                <span key={line} className="block">
                  {line.replace(/\.$/, "").split(" ").map((word, wi, arr) => {
                    const i = w++;
                    const lastWord = li === INTRO.lines.length - 1 && wi === arr.length - 1;
                    return (
                      <span key={word} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.18em] pr-[0.22em] align-top last:pr-0">
                        <motion.span
                          className="inline-block origin-bottom-left"
                          initial={{ y: "110%", rotate: 8 }}
                          animate={{ y: "0%", rotate: 0 }}
                          transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.15 + i * 0.075 }}
                        >
                          {word}
                        </motion.span>
                        {lastWord && (
                          <motion.span
                            className="ml-[0.05em] inline-block size-[0.19em] rounded-[0.035em] bg-red"
                            initial={{ y: "-4em", opacity: 0, rotate: -180 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 11, delay: 0.95 }}
                            aria-hidden
                          />
                        )}
                      </span>
                    );
                  })}
                </span>
              ))}
              <span className="sr-only">.</span>
            </h1>

            <motion.p
              className="lede mt-10 max-w-[52ch] !text-ink"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {INTRO.body}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <motion.a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-red py-3.5 pl-7 pr-3.5 text-[1rem] font-extrabold tracking-[-0.02em] text-black"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                See what I’ve shipped
                <span className="grid size-8 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-90" aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </motion.a>
              <motion.a
                href={`mailto:${PROFILE.email}`}
                className="rounded-full border-2 border-ink bg-white px-7 py-3.5 text-[1rem] font-extrabold tracking-[-0.02em] transition-colors hover:bg-ink hover:text-white"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Email me
              </motion.a>
            </motion.div>
          </div>

          <Orbit />
        </div>
      </div>
    </section>
  );
}
