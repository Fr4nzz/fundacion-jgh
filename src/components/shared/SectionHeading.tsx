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
      <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
      {/* Golden accent line */}
      <div className={cn(
        "mt-3 h-[2px] w-20 md:w-16 rounded-full bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60",
        centered && "mx-auto"
      )} />
      {subtitle && (
        <p className="mt-4 text-2xl md:text-xl leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
