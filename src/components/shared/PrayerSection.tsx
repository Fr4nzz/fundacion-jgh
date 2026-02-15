import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PrayerSectionProps {
  title: string;
  text: string;
}

export default function PrayerSection({ title, text }: PrayerSectionProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line font-serif text-base italic leading-relaxed text-muted-foreground">
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
