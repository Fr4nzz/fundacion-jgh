import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useDirectionalInView } from "@/hooks/useDirectionalInView";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
}

export default function SectionContainer({
  children,
  className,
  alt,
  id,
}: SectionContainerProps) {
  const { ref, isInView } = useDirectionalInView("-80px");

  return (
    <section
      id={id}
      className={cn(
        "relative",
        alt ? "bg-sky-mist" : "bg-transparent",
        className
      )}
    >
      {/* Soft cloud divider at top */}
      <div className="divider-cloud" />

      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-4xl px-6 py-20 md:py-20"
      >
        {children}
      </motion.div>
    </section>
  );
}
