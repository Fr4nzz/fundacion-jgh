import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  location: string;
  quote: string;
}

export default function TestimonialCard({ name, location, quote }: TestimonialCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <p className="text-base leading-relaxed text-muted-foreground italic">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-4">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
}
