import type { Variants } from "motion/react";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const fadeUp: Variants = prefersReducedMotion
  ? {}
  : {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

export const fadeIn: Variants = prefersReducedMotion
  ? {}
  : {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

export const staggerContainer: Variants = prefersReducedMotion
  ? {}
  : {
      hidden: {},
      visible: { transition: { staggerChildren: 0.15 } },
    };
