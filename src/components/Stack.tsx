"use client";

import { motion } from "motion/react";
import { STACK } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-gutter">
        <SectionHead n="04" kicker="Stack" title="Tools I’ve actually shipped with." />
        <div className="mt-14 grid gap-3 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-12">
          <div />
          <div className="grid gap-3 md:grid-cols-2">
            {STACK.map((r, ri) => (
              <motion.div
                key={r.name}
                className={`rounded-[2rem] p-6 sm:p-8 ${
                  ri === 0 ? "bg-ink text-white" : ri === 1 ? "border-2 border-ink bg-white" : "bg-red text-black md:col-span-2"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 110, damping: 18, delay: ri * 0.1 }}
              >
                <p className={`text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-none tracking-[-0.05em] ${ri === 2 ? "text-white" : ""}`}>
                  {r.name}<span className={ri === 2 ? "text-black" : "text-red"}>.</span>
                </p>
                <p className={`tag mt-3 ${ri === 0 ? "text-white/75" : ri === 2 ? "text-black" : "text-ink-3"}`}>{r.note}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {r.items.map((it, j) => (
                    <motion.li
                      key={it}
                      className={`cursor-default rounded-full px-3.5 py-2 text-[0.9375rem] font-bold tracking-[-0.01em] ${
                        ri === 0 ? "bg-white/10 hover:bg-red hover:text-black" : ri === 1 ? "bg-cream hover:bg-red hover:text-black" : "bg-black/10 hover:bg-black hover:text-white"
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, rotate: j % 2 ? 3 : -3 }}
                      transition={{ type: "spring", stiffness: 420, damping: 16, delay: ri * 0.1 + j * 0.03 }}
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
