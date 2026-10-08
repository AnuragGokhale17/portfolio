"use client";

import { MotionConfig, motion, useScroll, useSpring } from "motion/react";

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-red"
      style={{ scaleX }}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 260, damping: 26 }}>
      <ScrollBar />
      {children}
    </MotionConfig>
  );
}
