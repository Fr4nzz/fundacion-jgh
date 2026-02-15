import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeading({
  children,
  subtitle,
  className,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", centered && "text-center", className)}>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
