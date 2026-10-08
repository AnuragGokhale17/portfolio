"use client";

import { motion } from "motion/react";

/** The numbered rule that opens every section, as on motion.dev. */
export function SectionHead({
  n, kicker, title, intro, onRed, children,
}: { n: string; kicker: string; title: React.ReactNode; intro?: string; onRed?: boolean; children?: React.ReactNode }) {
  return (
    <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div className={`flex items-start justify-between border-t-[3px] pt-3 ${onRed ? "border-black" : "border-red"}`}>
        <span className={`tag num ${onRed ? "text-black" : "text-red-ink"}`}>{n}</span>
        <span className={`tag ${onRed ? "text-black" : "text-ink-3"}`}>{kicker}</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <motion.h2
            className={`h2 max-w-[16ch] ${onRed ? "text-white" : ""}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {title}
          </motion.h2>
          {intro && (
            <motion.p
              className={`lede mt-6 max-w-[50ch] ${onRed ? "!text-black" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.08 }}
            >
              {intro}
            </motion.p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
