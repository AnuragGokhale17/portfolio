"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { PROFILE } from "@/lib/content";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#roost", label: "Roost" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menu]);

  /* tuck away while reading down, come back the moment you scroll up */
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(!menu && y > prev && y > 240);
    setSolid(y > 24);
  });

  return (
    <>
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-line bg-paper/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-gutter">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${PROFILE.name}, back to top`}>
          <motion.span
            className="grid size-9 place-items-center rounded-[10px] bg-red text-[0.9375rem] font-extrabold tracking-[-0.05em] text-black"
            whileHover={{ rotate: -12, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
          >
            AG
          </motion.span>
          <span className="hidden text-[1.0625rem] font-extrabold tracking-[-0.04em] sm:inline">{PROFILE.name}</span>
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="tag rounded-full px-3 py-2 text-ink-2 transition-colors hover:bg-cream hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
        <motion.a
          href={PROFILE.resumeHref}
          className="tag rounded-full bg-red px-4 py-2.5 !text-[0.75rem] !font-bold text-black transition-colors hover:bg-ink hover:text-white"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Résumé PDF
        </motion.a>
        <button
          onClick={() => setMenu(true)}
          className="grid size-10 place-items-center rounded-full bg-ink text-white md:hidden"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          aria-label="Open menu"
        >
          <span className="flex w-4 flex-col gap-[5px]" aria-hidden>
            <span className="h-[2px] rounded bg-current" />
            <span className="h-[2px] rounded bg-current" />
          </span>
        </button>
        </div>
      </div>

    </motion.header>
      <AnimatePresence>
      {menu && (
        <motion.nav
          id="mobile-menu"
          aria-label="Sections"
          className="fixed inset-0 z-[55] flex flex-col bg-red px-gutter pb-10 md:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between">
            <span className="grid size-9 place-items-center rounded-[10px] bg-black text-[0.9375rem] font-extrabold tracking-[-0.05em] text-white">AG</span>
            <button
              onClick={() => setMenu(false)}
              className="grid size-10 place-items-center rounded-full bg-black text-white"
              aria-label="Close menu"
              autoFocus
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          <ul className="mt-auto flex flex-col gap-1">
            {LINKS.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.05 }}
              >
                <a
                  href={l.href}
                  onClick={() => setMenu(false)}
                  className="block text-[clamp(2.75rem,13vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.055em] text-white active:text-black"
                >
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <a href={`mailto:${PROFILE.email}`} className="mt-10 text-[1rem] font-bold text-black underline underline-offset-4">
            {PROFILE.email}
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
    </>
  );
}
