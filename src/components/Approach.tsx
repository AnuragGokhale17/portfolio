"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { PRINCIPLES } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span className="mr-[0.24em] inline-block" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

function Principle({ p, i }: { p: (typeof PRINCIPLES)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const words = p.title.split(" ");
  const fade = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const lift = useTransform(scrollYProgress, [0.55, 1], [18, 0]);
  const dot = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <li ref={ref} className="grid gap-x-12 gap-y-4 border-t border-line py-12 sm:py-16 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div className="flex items-start gap-3">
        <motion.span className="mt-2 block size-3 rounded-full bg-red" style={{ scale: dot }} aria-hidden />
        <span className="num text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.8] tracking-[-0.06em] text-red">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <h3 className="big max-w-[16ch]" aria-label={p.title}>
          {words.map((w, j) => (
            <Word key={j} progress={scrollYProgress} range={[j / words.length * 0.8, (j + 1) / words.length * 0.8 + 0.05]}>
              {w}
            </Word>
          ))}
        </h3>
        <motion.div className="mt-8 grid gap-6 md:grid-cols-2" style={{ opacity: fade, y: lift }}>
          <p className="lede">{p.body}</p>
          <p className="self-start rounded-2xl border-2 border-ink bg-white p-5 text-[0.9375rem] font-medium leading-snug shadow-[5px_5px_0_var(--color-red)]">
            <span className="tag mb-2 block text-red-ink">Where I did this</span>
            {p.evidence}
          </p>
        </motion.div>
      </div>
    </li>
  );
}

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-gutter">
        <SectionHead
          n="03"
          kicker="How I build"
          title="Six rules, each learned on the job."
          intro="Each one comes from something I shipped."
        />
        <ol className="mt-14 border-b border-line">
          {PRINCIPLES.map((p, i) => <Principle key={p.title} p={p} i={i} />)}
        </ol>
      </div>
    </section>
  );
}
