"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { PROFILE, LOOKING_FOR } from "@/lib/content";

/** a link that leans toward your cursor */
function Magnetic({ href, children, className, external }: { href: string; children: React.ReactNode; className?: string; external?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });
  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  /* the two halves of the sign-off slide in from opposite sides */
  const leftX = useTransform(scrollYProgress, [0.2, 1], ["-60%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.2, 1], ["60%", "0%"]);
  const headline = ["Let’s", "build", "something", "that", "ships."];

  return (
    <section id="contact" ref={ref} className="scroll-mt-20 overflow-hidden">
      <div className="bg-red text-black">
        <div className="mx-auto max-w-[1320px] px-gutter py-24 sm:py-32">
          <div className="flex items-start justify-between border-t-[3px] border-black pt-3">
            <span className="tag num">06</span>
            <span className="tag">Contact</span>
          </div>

          <h2 className="mega mt-12 max-w-[11ch] text-white">
            {headline.map((w, i) => (
              <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.2em] pr-[0.22em] align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%", rotate: 6 }}
                  whileInView={{ y: "0%", rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 110, damping: 16, delay: i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <p className="max-w-[44ch] text-[clamp(1.0625rem,1.4vw,1.25rem)] font-semibold leading-relaxed text-black">
              I’m open to {LOOKING_FOR.roles.join(", ")} roles. {LOOKING_FOR.basis}. Based in {PROFILE.location}, {PROFILE.timezone}.
            </p>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Magnetic
                href={`mailto:${PROFILE.email}`}
                className="inline-flex max-w-full items-center gap-3 rounded-full bg-white px-6 py-4 text-[clamp(0.9375rem,1.6vw,1.25rem)] font-bold tracking-[-0.02em] text-red-ink shadow-[0_6px_0_#000]"
              >
                <span className="truncate">{PROFILE.email}</span>
              </Magnetic>
              <div className="flex flex-wrap gap-2">
                <Magnetic href={PROFILE.linkedin} external className="tag rounded-full border-2 border-black px-4 py-2.5 !font-bold hover:bg-black hover:text-white">LinkedIn</Magnetic>
                <Magnetic href={PROFILE.github} external className="tag rounded-full border-2 border-black px-4 py-2.5 !font-bold hover:bg-black hover:text-white">GitHub</Magnetic>
                <Magnetic href={PROFILE.resumeHref} className="tag rounded-full border-2 border-black px-4 py-2.5 !font-bold hover:bg-black hover:text-white">Résumé PDF</Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-paper">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-gutter pt-8">
          <p className="tag text-ink-3">© {new Date().getFullYear()} {PROFILE.name}</p>
          <a href="#top" className="tag text-ink-3 hover:text-red-ink">Back to top</a>
        </div>
        {/* the sign-off: give him room, he knows what he's doing */}
        <div className="overflow-hidden pt-6">
          <p className="sr-only">Let him cook.</p>
          <div className="flex items-baseline gap-[0.22em] whitespace-nowrap pb-[0.24em] pl-gutter text-[clamp(3.25rem,15.5vw,15.5rem)] font-extrabold leading-[0.8] tracking-[-0.07em] text-ink" aria-hidden>
            <motion.span style={{ x: leftX }}>Let him</motion.span>
            <motion.span style={{ x: rightX }}>
              cook<span className="text-red">.</span>
            </motion.span>
          </div>
        </div>
      </footer>
    </section>
  );
}
