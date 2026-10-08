"use client";

import { useRef } from "react";
import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring,
  useTransform, useVelocity, useInView, animate,
} from "motion/react";
import { useEffect, useState } from "react";
import { MARQUEE, STATS } from "@/lib/content";

/* wrap a value into [min, max) so the band loops forever */
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** A red band that drifts on its own, and races (or reverses) with your scroll. */
export function Marquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(vel, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    base.set(base.get() - dir.current * (delta / 1000) * (1.6 + Math.abs(b)));
  });

  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative -rotate-[1.2deg] overflow-hidden border-y-2 border-ink bg-red py-4 text-white" aria-label={MARQUEE.join(", ")}>
      <motion.div className="flex w-max items-center gap-8 whitespace-nowrap" style={{ x }} aria-hidden>
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-8 text-[clamp(1.25rem,2.4vw,2rem)] font-extrabold tracking-[-0.04em]">
            {m}
            <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0"><path d="M11 0l2.6 8.4L22 11l-8.4 2.6L11 22l-2.6-8.4L0 11l8.4-2.6z" fill="#fff" /></svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Count({ to, from = 0, run }: { to: number; from?: number; run: boolean }) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!run) return;
    const c = animate(from, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [run, from, to]);
  return <>{v.toLocaleString("en-US")}</>;
}

export function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div className="mx-auto max-w-[1320px] px-gutter pt-16">
      <dl ref={ref} className="grid grid-cols-2 overflow-hidden rounded-[2rem] bg-red shadow-[8px_8px_0_#000] lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="border-black/25 p-5 sm:p-7 [&:nth-child(n+3)]:border-t-2 lg:[&:nth-child(n+3)]:border-t-0 [&:nth-child(even)]:border-l-2 lg:[&:not(:first-child)]:border-l-2"
            initial={{ opacity: 0, y: 24 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.08 }}
          >
            <dt className="tag text-black">{s.label}</dt>
            <dd className="mt-5 text-[clamp(2.4rem,4.6vw,4rem)] font-extrabold leading-none tracking-[-0.06em] text-white">
              {"to" in s ? (
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[0.5em] text-black line-through decoration-white decoration-[3px]"><Count to={s.value} run={seen} /></span>
                  <span>&lt;<Count to={s.to} from={s.value} run={seen} /></span>
                </span>
              ) : (
                <>
                  <Count to={s.value} run={seen} />
                  {"suffix" in s && <span className="text-black">{s.suffix}</span>}
                </>
              )}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
