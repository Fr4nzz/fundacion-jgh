import type { Variants } from "motion/react";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Helper: wraps variants so reduced-motion users get instant display */
function rm(v: Variants): Variants {
  return prefersReducedMotion ? {} : v;
}

/* ── Core entrance animations ── */

export const fadeUp: Variants = rm({
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

export const fadeIn: Variants = rm({
  hidden: { opacity: 0, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

export const fadeDown: Variants = rm({
  hidden: { opacity: 0, y: -20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

/* ── Scale + fade (for cards, modals) ── */

export const scaleIn: Variants = rm({
  hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

/* ── Float / levitation (for hero elements, icons) ── */

export const floatGentle: Variants = rm({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

/* ── Stagger containers ── */

export const staggerContainer: Variants = rm({
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
});

export const staggerContainerSlow: Variants = rm({
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
});

/* ── Slide variants ── */

export const slideFromLeft: Variants = rm({
  hidden: { opacity: 0, x: -40, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

export const slideFromRight: Variants = rm({
  hidden: { opacity: 0, x: 40, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

/* ── Celestial reveal (for headings — glowing entrance) ── */

export const celestialReveal: Variants = rm({
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/* ── Hover helpers (use with whileHover on motion elements) ── */

export const hoverLift = prefersReducedMotion
  ? {}
  : {
      y: -4,
      scale: 1.01,
      transition: { duration: 0.3, ease: "easeOut" as const },
    };

export const hoverGlow = prefersReducedMotion
  ? {}
  : {
      scale: 1.02,
      boxShadow: "0 8px 40px rgba(90, 155, 213, 0.18), 0 0 20px rgba(212, 162, 69, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" as const },
    };
