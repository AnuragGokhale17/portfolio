"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { SectionHead } from "@/components/SectionHead";
import { PROFILE } from "@/lib/content";

/**
 * Roost's real pipeline, step by step, as described on the résumé.
 * No timings or token counts: only what each step is and what it uses.
 */

type Kind = "Code" | "Model" | "Browser" | "You";

const STEPS: { id: string; kind: Kind; title: string; body: string }[] = [
  { id: "discover", kind: "Code", title: "Discover", body: "Queries Greenhouse, Lever, Ashby, SmartRecruiters, Recruitee and Workday, plus JSON-LD on career pages. No model involved." },
  { id: "prospect", kind: "Model", title: "Prospect", body: "Grows a persistent registry of companies worth watching." },
  { id: "score", kind: "Model", title: "Score", body: "Scores the résumé against each job, in parallel. Results are cached in SQLite." },
  { id: "write", kind: "Model", title: "Write", body: "Drafts a cover letter tailored to the job." },
  { id: "apply", kind: "Browser", title: "Fill", body: "Playwright, guided by vision, fills the real application form." },
  { id: "approve", kind: "You", title: "Approve", body: "Nothing is sent until you say yes, by click or by voice." },
];

const KIND_STYLE: Record<Kind, string> = {
  Code: "bg-cream text-ink",
  Model: "bg-red text-black",
  Browser: "bg-ink text-white",
  You: "border-2 border-red text-red-ink",
};

export function RoostFlow() {
  const [cached, setCached] = useState(false);
  const [limited, setLimited] = useState(false);
  const [at, setAt] = useState(0);
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, { margin: "-120px" });

  const path = STEPS.map((s) => s.id).filter((id) => !(cached && id === "score"));
  const current = path[Math.min(at, path.length - 1)];
  const waiting = current === "approve" && !sent;

  /* walk the job forward on its own, and stop at the person */
  useEffect(() => {
    if (!live || waiting) return;
    const t = setTimeout(() => {
      if (sent) { setSent(false); setAt(0); return; }
      setAt((a) => Math.min(a + 1, path.length - 1));
    }, sent ? 2200 : 1300);
    return () => clearTimeout(t);
  }, [live, waiting, sent, at, path.length]);

  return (
    <section id="roost" className="scroll-mt-20 bg-red py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-gutter">
        <SectionHead
          onRed
          n="02"
          kicker="Inside Roost"
          title="Six agents. One person says yes."
          intro="Roost is my autonomous job search system, and it’s live. Here is one job moving through it. Agents hand work to each other through plain code, and the model only runs where judgment is needed."
        >
          <motion.a
            href={PROFILE.roostUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 rounded-full bg-black py-3 pl-7 pr-3 text-white shadow-[6px_6px_0_#fff]"
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            <span className="flex flex-col">
              <span className="text-[1.25rem] font-extrabold leading-none tracking-[-0.03em]">Try Roost live</span>
              <span className="num mt-1 text-[0.75rem] text-white/70">{PROFILE.roostLabel}</span>
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-red text-black transition-transform duration-300 group-hover:rotate-45" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 12 12"><path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </motion.a>
        </SectionHead>

        <motion.div
          ref={ref}
          className="mt-14 overflow-hidden rounded-[2rem] bg-white text-ink shadow-[10px_10px_0_#000]"
          initial={{ opacity: 0, y: 50, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <div className="flex flex-col gap-3 border-b-2 border-ink p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-6">
            <div className="flex flex-wrap gap-2">
              <Switch on={cached} onChange={(v) => { setCached(v); setAt(0); setSent(false); }}>Job seen before</Switch>
              <Switch on={limited} onChange={setLimited}>Provider rate-limited</Switch>
            </div>
            <p className="text-[0.9375rem] font-bold">
              {sent ? "Submitted. Next job…" : waiting ? "Waiting for you." : "Running…"}
            </p>
          </div>

          <ol className="grid divide-y-2 divide-ink md:grid-cols-3 md:divide-y-0 lg:grid-cols-6">
            {STEPS.map((s, i) => {
              const skipped = cached && s.id === "score";
              const active = s.id === current;
              const done = path.indexOf(s.id) > -1 && path.indexOf(s.id) < path.indexOf(current);
              const rotated = limited && s.kind === "Model" && !skipped && s.id !== "prospect";
              return (
                <li
                  key={s.id}
                  className={`relative flex flex-col p-5 md:min-h-[17rem] transition-colors duration-300 md:border-l-2 md:border-ink md:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:border-l-2 lg:first:!border-l-0 md:[&:nth-child(n+4)]:border-t-2 lg:[&:nth-child(n+4)]:border-t-0 ${
                    active ? "bg-ink text-white" : skipped ? "bg-paper text-ink-3" : "bg-white"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className="num text-[2.25rem] font-bold leading-none tracking-[-0.06em]">{i + 1}</span>
                    <span className={`tag rounded-full px-2.5 py-1 ${active && s.kind === "Code" ? "bg-white text-ink" : KIND_STYLE[s.kind]} ${active && s.kind === "You" ? "!text-white" : ""}`}>
                      {s.kind}
                    </span>
                  </div>
                  <h3 className={`mt-6 text-[1.75rem] font-extrabold leading-none tracking-[-0.05em] ${skipped ? "line-through decoration-red decoration-[3px]" : ""}`}>{s.title}</h3>
                  <p className={`mt-3 text-[0.875rem] font-medium leading-snug ${active ? "text-white/85" : "text-ink-2"}`}>
                    {skipped ? "Already scored. Read from the cache, no model call." : s.body}
                  </p>

                  <div className="mt-auto flex min-h-9 flex-wrap items-end gap-2 pt-4">
                    {active && (
                      <motion.span
                        layoutId="job-token"
                        className="flex items-center gap-1.5 rounded-full bg-red px-3 py-1.5 text-[0.75rem] font-extrabold text-black"
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      >
                        <span className="size-1.5 rounded-full bg-black" style={{ animation: "blink 0.9s steps(2) infinite" }} aria-hidden />
                        1 job
                      </motion.span>
                    )}
                    <AnimatePresence mode="popLayout">
                      {rotated && (
                        <motion.span
                          key="rot"
                          className={`tag rounded-full px-2.5 py-1 ${active ? "bg-white text-ink" : "bg-red-pale text-red-ink"}`}
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                        >
                          429 → key rotated
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {done && !rotated && (
                      <motion.span className="tag text-ink-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Done</motion.span>
                    )}
                  </div>

                  {s.id === "approve" && (
                    <div className="mt-3">
                      <AnimatePresence mode="wait">
                        {sent ? (
                          <motion.p key="sent" className="text-[1.125rem] font-extrabold text-red" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                            Sent.
                          </motion.p>
                        ) : (
                          <motion.button
                            key="btn"
                            onClick={() => waiting && setSent(true)}
                            disabled={!waiting}
                            className={`w-full rounded-full px-4 py-2.5 text-[0.9375rem] font-extrabold transition-colors ${
                              waiting ? "bg-red text-black" : active ? "bg-white/15 text-white/60" : "bg-cream text-ink-3"
                            }`}
                            animate={waiting ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                            transition={waiting ? { repeat: Infinity, duration: 1.1 } : undefined}
                            whileTap={{ scale: 0.92 }}
                          >
                            {waiting ? "Approve" : "Waiting for a job"}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="grid gap-px border-t-2 border-ink bg-ink sm:grid-cols-2">
            <p className="bg-white p-5 text-[0.9375rem] font-semibold leading-snug">
              <span className="tag mb-1.5 block text-red-ink">Running alongside</span>
              Voice control through the Gemini Live API, and a React dashboard showing the live browser.
            </p>
            <p className="bg-white p-5 text-[0.9375rem] font-semibold leading-snug">
              <span className="tag mb-1.5 block text-red-ink">Stack</span>
              Python, Groq, Gemini, Playwright, React, SQLite.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Switch({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`inline-flex items-center gap-2.5 rounded-full border-2 py-1.5 pl-1.5 pr-4 text-[0.875rem] font-bold transition-colors ${on ? "border-ink bg-ink text-white" : "border-ink bg-white"}`}
    >
      <span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${on ? "justify-end bg-red" : "justify-start bg-line-hi"}`}>
        <motion.span layout className="size-4 rounded-full bg-white" transition={{ type: "spring", stiffness: 600, damping: 32 }} />
      </span>
      {children}
    </button>
  );
}
