import { motion } from "motion/react";
import { celestialReveal } from "@/lib/animations";
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

/** Decorative floating cloud wisps */
function CloudWisps() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large cloud — top left */}
      <div
        className="absolute -left-20 -top-10 h-48 w-72 rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)",
          filter: "blur(30px)",
          animation: "cloud-float-1 12s ease-in-out infinite",
        }}
      />
      {/* Medium cloud — top right */}
      <div
        className="absolute -right-16 top-4 h-36 w-56 rounded-full opacity-25"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)",
          filter: "blur(25px)",
          animation: "cloud-float-2 15s ease-in-out infinite",
        }}
      />
      {/* Small wisp — center */}
      <div
        className="absolute left-1/3 top-1/4 h-24 w-40 rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: "cloud-float-3 10s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/** Subtle sunbeam rays from top */
function SunbeamRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 -top-20 h-80 w-[500px] -translate-x-1/2 opacity-[0.06]"
        style={{
          background: "conic-gradient(from 80deg at 50% 0%, transparent 0deg, rgba(242,192,120,0.5) 15deg, transparent 30deg, rgba(242,192,120,0.3) 45deg, transparent 60deg, rgba(242,192,120,0.4) 75deg, transparent 90deg)",
          filter: "blur(8px)",
          animation: "sunbeam 8s ease-in-out infinite",
        }}
      />
    </div>
  );
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
          backgroundImage ? "text-white" : "bg-heaven-gradient text-white",
          className
        )}
      >
        {backgroundImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {overlay && <div className="absolute inset-0 bg-gradient-to-b from-[#2A4F7A]/70 to-[#3B6B9C]/50" />}
          </>
        ) : (
          <>
            <CloudWisps />
            <SunbeamRays />
          </>
        )}

        <motion.div
          variants={celestialReveal}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center"
        >
          {headlines.map((line, i) => (
            <h1
              key={i}
              className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
            >
              {line}
            </h1>
          ))}
          {subtitle && (
            <p className="mt-6 text-xl leading-relaxed text-white/85">
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </section>
    );
  }

  /* ── Full hero (homepage) — image + celestial text band ── */
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
          {/* Gradient fade from image into the celestial band */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#2A4F7A]/60 to-[#1e3d6b]" />
        </div>
      )}

      {/* Text band — celestial gradient with cloud wisps */}
      <div className="relative bg-gradient-to-b from-[#1e3d6b] via-[#2A4F7A] to-[#345f8f] text-white overflow-hidden">
        <CloudWisps />
        <SunbeamRays />

        <motion.div
          variants={celestialReveal}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-8 text-center md:pb-18"
        >
          {headlines.map((line, i) => (
            <h1
              key={i}
              className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
            >
              {line}
            </h1>
          ))}
          {subtitle && (
            <p className="mt-6 text-balance text-xl leading-relaxed text-white/85">
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
                  <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60">
                    <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60" onClick={secondaryCta.onClick}>
                    {secondaryCta.label}
                  </Button>
                ))}
            </div>
          )}
          {children}
        </motion.div>

        {/* Bottom edge: soft cloud fade into page background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#F0F5FA]" />
      </div>
    </section>
  );
}
