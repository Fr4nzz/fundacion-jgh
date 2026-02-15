import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

interface TimelineItemProps {
  date?: string;
  title: string;
  children: React.ReactNode;
}

export default function TimelineItem({ date, title, children }: TimelineItemProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-px bg-border last:hidden" />
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-[22px] w-[22px] rounded-full border-2 border-primary bg-card" />

      <div className="space-y-3">
        {date && (
          <Badge variant="secondary" className="font-mono text-xs">
            {date}
          </Badge>
        )}
        <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
          {title}
        </h3>
        <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
