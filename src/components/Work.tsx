"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { WORK, FOUNDATIONS, type Work as WorkT, type Status } from "@/lib/content";
import { ART } from "@/components/TileArt";
import { SectionHead } from "@/components/SectionHead";

/* the two red tiles, as in the reference grid */
const RED = new Set(["roost", "vlm", "ppe"]);

const STATUS_DOT: Record<Status, string> = {
  Production: "bg-[#2f8f4e]",
  Pilot: "bg-[#d89b00]",
  "In progress": "bg-[#3d6fd8]",
  Personal: "bg-ink",
};

/* true on devices with a real hover (mouse, trackpad) */
const hoverQuery = "(hover: hover)";
function useCanHover() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(hoverQuery);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(hoverQuery).matches,
    () => true
  );
}

/**
 * Plays a tile's loop only while it has someone's attention:
 * hovered or focused with a mouse, or sitting in the middle of the
 * screen on touch. `always` is for the open detail view.
 */
function Live({ children, className, active, always }: { children: React.ReactNode; className?: string; active?: boolean; always?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const centred = useInView(ref, { margin: "-38% 0px -38% 0px" });
  const onScreen = useInView(ref);
  const live = always ? onScreen : canHover ? !!active : centred;
  return <div ref={ref} data-live={live} className={`loop ${className ?? ""}`}>{children}</div>;
}

function Tile({ w, i, onOpen }: { w: WorkT; i: number; onOpen: () => void }) {
  const red = RED.has(w.id);
  const [attn, setAttn] = useState(false);
  const Art = ART[w.id];
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 140, damping: 20, delay: (i % 4) * 0.07 }}
    >
      <motion.button
        layoutId={`tile-${w.id}`}
        onClick={onOpen}
        onHoverStart={() => setAttn(true)}
        onHoverEnd={() => setAttn(false)}
        onFocus={() => setAttn(true)}
        onBlur={() => setAttn(false)}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left ${
          red ? "border-red bg-red text-black" : "border-line bg-white text-ink"
        }`}
        whileHover={{ y: -6, rotate: i % 2 ? 0.6 : -0.6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        aria-label={`${w.name}. Open details.`}
      >
        <Live active={attn} className={`h-44 w-full border-b ${red ? "border-black/20" : "border-line"}`}>
          <Art onRed={red} />
        </Live>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className={`tag num ${red ? "text-black" : "text-red-ink"}`}>{String(i + 1).padStart(2, "0")}</span>
            <span
              className={`grid size-8 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
                red ? "bg-black text-white" : "bg-cream text-ink group-hover:bg-red group-hover:text-black"
              }`}
              aria-hidden
            >
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </span>
          </div>
          <h3 className={`h3 mt-3 ${red ? "text-white" : ""}`}>{w.name}</h3>
          <p className={`mt-2 text-[0.9375rem] font-medium leading-snug ${red ? "text-black" : "text-ink-2"}`}>{w.oneLine}</p>
          <div className={`tag mt-auto flex items-center gap-2 pt-5 ${red ? "text-black" : "text-ink-3"}`}>
            {w.status && <span className={`size-1.5 rounded-full ${red ? "bg-black" : STATUS_DOT[w.status]}`} aria-hidden />}
            {w.status ?? "Shipped"}
            {w.live && (
              <span className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${red ? "bg-black text-white" : "bg-red text-black"}`}>
                <span className="relative size-1.5 rounded-full bg-current" aria-hidden>
                  <span className="absolute inset-0 rounded-full bg-current" style={{ animation: "ping 1.6s ease-out infinite" }} />
                </span>
                Live
              </span>
            )}
            <span className="ml-auto num">{w.year}</span>
          </div>
        </div>
      </motion.button>
    </motion.li>
  );
}

function Detail({ w, onClose }: { w: WorkT; onClose: () => void }) {
  const red = RED.has(w.id);
  const Art = ART[w.id];
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !boxRef.current) return;
      /* keep Tab inside the dialog */
      const f = boxRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div ref={boxRef} className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby={`d-${w.id}`}>
      <motion.div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`tile-${w.id}`}
        className={`relative max-h-[92vh] w-full max-w-[880px] overflow-y-auto rounded-3xl border ${
          red ? "border-red bg-red text-black" : "border-line bg-white text-ink"
        }`}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <Live always className={`h-52 border-b ${red ? "border-black/20" : "border-line"}`}>
          <Art onRed={red} />
        </Live>
        <button
          ref={closeRef}
          onClick={onClose}
          className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-ink text-white`}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        <motion.div
          className="grid gap-8 p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div>
            <p className={`tag ${red ? "text-black" : "text-ink-3"}`}>{w.status ?? "Shipped"}, {w.year}</p>
            <h3 id={`d-${w.id}`} className={`mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[0.92] tracking-[-0.05em] ${red ? "text-white" : ""}`}>{w.name}</h3>
            <p className={`mt-5 text-[1rem] font-medium leading-relaxed ${red ? "text-black" : "text-ink-2"}`}>{w.problem}</p>
            {w.live && (
              <motion.a
                href={w.live.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-flex items-center gap-3 rounded-full py-2.5 pl-5 pr-2.5 text-[1rem] font-extrabold tracking-[-0.02em] ${red ? "bg-black text-white" : "bg-red text-black"}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Open {w.name}, live
                <span className={`grid size-8 place-items-center rounded-full ${red ? "bg-red text-black" : "bg-black text-white"}`} aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </motion.a>
            )}
            {w.outcome && (
              <p className={`mt-6 rounded-xl p-4 text-[1.0625rem] font-semibold leading-snug ${red ? "bg-black text-white" : "bg-red-pale text-red-ink"}`}>
                {w.outcome}
              </p>
            )}
          </div>
          <div>
            <p className={`tag ${red ? "text-black" : "text-ink-3"}`}>Decisions</p>
            <ol className="mt-3 space-y-3">
              {w.decisions.map((d, j) => (
                <motion.li
                  key={d}
                  className="grid grid-cols-[1.75rem_1fr] gap-2 text-[0.9375rem] leading-relaxed"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.22 + j * 0.06 } }}
                >
                  <span className={`num pt-[2px] text-[0.75rem] font-bold ${red ? "text-black" : "text-red-ink"}`}>{String(j + 1).padStart(2, "0")}</span>
                  <span className={`font-medium ${red ? "text-black" : "text-ink-2"}`}>{d}</span>
                </motion.li>
              ))}
            </ol>
            <ul className="mt-7 flex flex-wrap gap-1.5">
              {w.stack.map((s) => (
                <li key={s} className={`num rounded-full border px-2.5 py-1 text-[0.75rem] ${red ? "border-black/40 text-black" : "border-line-hi text-ink-2"}`}>{s}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Work() {
  const [open, setOpen] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const active = WORK.find((w) => w.id === open);

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);

  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-gutter">
        <SectionHead
          n="01"
          kicker="Shipped"
          title="Eight systems, from agents to cameras."
          intro="LLM and agent work first, then the vision systems it grew out of. Open any tile for the problem, the decisions and the result."
        />

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WORK.map((w, i) => (
            <Tile
              key={w.id}
              w={w}
              i={i}
              onOpen={() => {
                lastFocus.current = document.activeElement as HTMLElement;
                setOpen(w.id);
              }}
            />
          ))}
        </ul>

        <motion.div
          className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="bg-cream p-5 sm:p-6">
            <p className="h3">{FOUNDATIONS.title}</p>
            <p className="body mt-2">{FOUNDATIONS.body}</p>
          </div>
          {FOUNDATIONS.items.map((f) => (
            <div key={f.name} className="bg-white p-5 sm:p-6">
              <p className="tag flex items-center gap-2 text-ink-3">
                <span className={`size-1.5 rounded-full ${STATUS_DOT[f.status]}`} aria-hidden />
                {f.status}
              </p>
              <p className="mt-3 font-bold tracking-[-0.02em]">{f.name}</p>
              <p className="body mt-1.5 text-[0.875rem]">{f.fact}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>{active && <Detail key={active.id} w={active} onClose={close} />}</AnimatePresence>
    </section>
  );
}
