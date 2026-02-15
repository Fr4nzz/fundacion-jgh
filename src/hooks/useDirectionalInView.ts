import { useEffect, useRef, useState } from "react";

/**
 * Directional scroll-aware visibility hook.
 *
 * - Element enters viewport → animate to visible
 * - Element exits through TOP (user scrolls down past it) → stay visible
 * - Element exits through BOTTOM (user scrolls back up) → reset to hidden
 */
export function useDirectionalInView(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Determine exit direction:
          // If element's top is in the lower half of the viewport, it exited
          // through the bottom (user scrolled up) → reset to hidden.
          // Otherwise it exited through the top → keep visible.
          const viewportHeight =
            entry.rootBounds?.height ?? window.innerHeight;
          if (entry.boundingClientRect.top >= viewportHeight / 2) {
            setIsInView(false);
          }
        }
      },
      { rootMargin: `${margin} 0px ${margin} 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, isInView };
}
