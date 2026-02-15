import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Phone, ExternalLink, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { useDirectionalInView } from "@/hooks/useDirectionalInView";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/animations";
import { PHONE_1, PHONE_2 } from "@/lib/constants";

interface MiracleSource {
  name: string;
  url: string;
}

interface Miracle {
  badge: string;
  pullQuote: string;
  title: string;
  paragraphs: string[];
  sourcesLabel: string;
  sources: MiracleSource[];
}

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  sourceName?: string;
  sourceUrl?: string;
}

function MiracleBlock({ miracle }: { miracle: Miracle }) {
  const [open, setOpen] = useState(false);
  const { ref, isInView } = useDirectionalInView("-60px");

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative rounded-2xl glass-subtle p-6 border-l-4 border-l-secondary/50"
    >
      <Badge variant="secondary" className="mb-3 text-xs uppercase">
        {miracle.badge}
      </Badge>
      <p className="mb-4 font-serif text-3xl md:text-2xl italic text-foreground">
        {miracle.pullQuote}
      </p>
      <h3 className="mb-4 font-serif text-4xl md:text-3xl font-semibold text-foreground">
        {miracle.title}
      </h3>
      <div className="space-y-3 text-xl md:text-lg leading-relaxed text-muted-foreground">
        {miracle.paragraphs.map((p, j) => (
          <p key={j}>{p}</p>
        ))}
      </div>

      {/* Sources toggle */}
      {miracle.sources?.length > 0 && (
        <div className="mt-5">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
            {miracle.sourcesLabel}
          </button>
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1.5 overflow-hidden"
              >
                {miracle.sources.map((src, k) => (
                  <li key={k}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-secondary transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      {src.name}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default function MilagrosPage() {
  const { t } = useTranslation("milagros");
  const miracles = t("miracles", { returnObjects: true }) as Miracle[];
  const testimonials = t("testimonials.items", {
    returnObjects: true,
  }) as Testimonial[];

  return (
    <>
      <PageHero
        compact
        headline={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* Official miracles */}
      <section className="bg-transparent">
        <div className="mx-auto max-w-4xl space-y-8 px-6 py-20 md:py-20">
          {miracles.map((miracle, i) => (
            <MiracleBlock key={i} miracle={miracle} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <SectionContainer alt>
        <SectionHeading subtitle={t("testimonials.intro")}>
          {t("testimonials.title")}
        </SectionHeading>
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((item, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={hoverLift}>
              <TestimonialCard
                name={item.name}
                location={item.location}
                quote={item.quote}
                sourceName={item.sourceName}
                sourceUrl={item.sourceUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>

      {/* Share CTA */}
      <SectionContainer>
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-3xl font-bold text-foreground">
            {t("shareCta.title")}
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent" />
          <p className="mx-auto mt-4 max-w-xl text-xl md:text-lg leading-relaxed text-muted-foreground">
            {t("shareCta.body")}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button size="lg">{t("shareCta.button")}</Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>
                {PHONE_1} / {PHONE_2}
              </span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
