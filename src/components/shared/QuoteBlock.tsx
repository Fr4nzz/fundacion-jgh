import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  text: string;
  attribution?: string;
  className?: string;
}

export default function QuoteBlock({ text, attribution, className }: QuoteBlockProps) {
  return (
    <blockquote className={cn("relative mx-auto max-w-2xl text-center", className)}>
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-serif text-6xl text-secondary/30 select-none">
        &ldquo;
      </span>
      <p className="font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
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
