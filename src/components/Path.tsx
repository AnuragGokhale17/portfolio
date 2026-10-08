"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PATH } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";

function Stop({ p, i, n, progress }: { p: (typeof PATH)[number]; i: number; n: number; progress: MotionValue<number> }) {
  const at = i / (n - 1);
  const lit = useTransform(progress, [at - 0.04, at], [0, 1]);
  const bg = useTransform(lit, [0, 1], ["#ffffff", "#ff2800"]);
  const scale = useTransform(lit, [0, 0.6, 1], [1, 1.5, 1]);

  return (
    <motion.li
      className="relative pb-12 pl-10 last:pb-0 sm:pl-14"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.span
        className="absolute left-0 top-[0.35rem] size-[18px] -translate-x-1/2 rounded-full border-[3px] border-red"
        style={{ backgroundColor: bg, scale }}
        aria-hidden
      />
      <p className="num text-[0.8125rem] font-medium text-red-ink">{p.when}</p>
      <p className="mt-1 text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.05em]">{p.what}</p>
      {"where" in p && p.where && <p className="tag mt-2 text-ink-3">{p.where}</p>}
      {"detail" in p && p.detail && <p className="body mt-3 max-w-[62ch]">{p.detail}</p>}
      {"tags" in p && p.tags && (
        <ul className="mt-4 flex max-w-[62ch] flex-wrap gap-1.5">
          {p.tags.map((t, j) => (
            <motion.li
              key={t}
              className="rounded-full border-2 border-ink px-3 py-1 text-[0.8125rem] font-bold tracking-[-0.01em]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ backgroundColor: "#ff2800", scale: 1.05 }}
              transition={{ delay: j * 0.04 }}
            >
              {t}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}

export function Path() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="path" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-gutter">
        <SectionHead n="05" kicker="Path" title="From plant floors to agents." />
        <div className="mt-14 grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-12">
          <div />
          <ol ref={ref} className="relative ml-2">
            <span className="absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 rounded-full bg-line" aria-hidden />
            <motion.span
              className="absolute inset-y-0 left-0 w-[3px] origin-top -translate-x-1/2 rounded-full bg-red"
              style={{ scaleY: progress }}
              aria-hidden
            />
            {PATH.map((p, i) => <Stop key={p.when + p.what} p={p} i={i} n={PATH.length} progress={progress} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}
