import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

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
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-4xl px-6 py-16 md:py-20"
      >
        {children}
      </motion.div>
    </section>
  );
}
