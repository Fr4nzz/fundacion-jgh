import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { useDirectionalInView } from "@/hooks/useDirectionalInView";

interface TimelineItemProps {
  date?: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function TimelineItem({ date, title, children }: TimelineItemProps) {
  const { ref, isInView } = useDirectionalInView("-60px");

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative pl-10 pb-14 last:pb-0"
    >
      {/* Timeline line — celestial gradient */}
      <div
        className="absolute left-[11.5px] top-2 bottom-0 w-px last:hidden"
        style={{
          background: "linear-gradient(180deg, rgba(90,155,213,0.4) 0%, rgba(212,162,69,0.2) 100%)",
        }}
      />
      {/* Timeline dot — glowing orb */}
      <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-celestial bg-white/80 shadow-[0_0_10px_rgba(90,155,213,0.3)]" />

      <div className="space-y-3">
        {date && (
          <Badge variant="secondary" className="font-mono text-xs">
            {date}
          </Badge>
        )}
        <h3 className="font-serif text-3xl md:text-2xl font-semibold text-foreground">
          {title}
        </h3>
        <div className="space-y-3 text-xl md:text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
