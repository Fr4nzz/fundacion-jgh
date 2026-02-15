import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  text: string;
  attribution?: string;
  className?: string;
}

export default function QuoteBlock({ text, attribution, className }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "relative mx-auto max-w-2xl rounded-2xl px-8 py-6 text-center glass-subtle",
        className
      )}
    >
      {/* Decorative golden quote mark */}
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-6xl text-shimmer select-none leading-none">
        &ldquo;
      </span>
      <p className="mt-4 font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
        {text}
      </p>
      {attribution && (
        <cite className="mt-4 block text-sm font-medium not-italic tracking-wider text-muted-foreground uppercase">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}
