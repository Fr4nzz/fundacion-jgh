import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Reference {
  source: string;
  desc: string;
  url: string;
}

interface ReferencesSectionProps {
  title: string;
  items: Reference[];
}

export default function ReferencesSection({ title, items }: ReferencesSectionProps) {
  const [open, setOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="border-t border-border px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
          {title}
          <span className="text-xs opacity-60">({items.length})</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ol
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 space-y-2 overflow-hidden list-none"
            >
              {items.map((ref, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="shrink-0 text-xs font-mono text-muted-foreground/50">
                    {i + 1}.
                  </span>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-secondary transition-colors"
                  >
                    <span className="font-medium text-foreground">{ref.source}</span>
                    <span className="text-muted-foreground"> — {ref.desc} </span>
                    <ExternalLink className="inline h-3 w-3 text-muted-foreground/70" />
                  </a>
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
