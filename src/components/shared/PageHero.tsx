import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  to?: string;
  onClick?: () => void;
}

interface PageHeroProps {
  headline?: string | string[];
  subtitle?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  backgroundImage?: string;
  overlay?: boolean;
  compact?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
  overlay = true,
  compact,
  className,
  children,
}: PageHeroProps) {
  const headlines = Array.isArray(headline) ? headline : headline ? [headline] : [];

  /* ── Compact hero (inner pages) ── */
  if (compact) {
    return (
      <section
        className={cn(
          "relative flex min-h-[40vh] items-center justify-center overflow-hidden",
          backgroundImage ? "text-white" : "bg-muted text-foreground",
          className
        )}
      >
        {backgroundImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {overlay && <div className="absolute inset-0 bg-black/60" />}
          </>
        )}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center"
        >
          {headlines.map((line, i) => (
            <h1
              key={i}
              className="text-balance font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl"
            >
              {line}
            </h1>
          ))}
          {subtitle && (
            <p className={cn(
              "mt-6 text-lg leading-relaxed",
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </section>
    );
  }

  /* ── Full hero (homepage) — full image, then text below with fade ── */
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Image at natural aspect ratio */}
      {backgroundImage && (
        <div className="relative">
          <img
            src={backgroundImage}
            alt=""
            className="block w-full"
          />
          {/* Soft fade at bottom edge of image into the text band */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#132840]" />
        </div>
      )}

      {/* Text band — seamlessly continues from image fade */}
      <div className="bg-[#132840] text-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl px-6 pb-12 pt-4 text-center md:pb-16"
        >
          {headlines.map((line, i) => (
            <h1
              key={i}
              className="text-balance font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl"
            >
              {line}
            </h1>
          ))}
          {subtitle && (
            <p className="mt-6 text-balance text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {primaryCta &&
                (primaryCta.to ? (
                  <Button asChild size="lg" variant="secondary">
                    <Link to={primaryCta.to}>{primaryCta.label}</Link>
                  </Button>
                ) : (
                  <Button size="lg" variant="secondary" onClick={primaryCta.onClick}>
                    {primaryCta.label}
                  </Button>
                ))}
              {secondaryCta &&
                (secondaryCta.to ? (
                  <Button asChild size="lg" variant="outline" className="border-white/60 bg-white/15 text-white hover:bg-white/25">
                    <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="border-white/60 bg-white/15 text-white hover:bg-white/25" onClick={secondaryCta.onClick}>
                    {secondaryCta.label}
                  </Button>
                ))}
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
