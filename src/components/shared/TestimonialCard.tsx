import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  location: string;
  quote: string;
  sourceName?: string;
  sourceUrl?: string;
}

export default function TestimonialCard({ name, location, quote, sourceName, sourceUrl }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {/* Quote mark */}
        <span className="mb-2 block font-serif text-3xl leading-none text-secondary/40 select-none">&ldquo;</span>
        <p className="text-base leading-relaxed text-muted-foreground italic">
          {quote}&rdquo;
        </p>
        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-secondary transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {sourceName || "Fuente"}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
