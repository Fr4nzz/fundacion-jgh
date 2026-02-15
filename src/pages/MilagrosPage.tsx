import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PHONE_1, PHONE_2 } from "@/lib/constants";

interface Miracle {
  badge: string;
  pullQuote: string;
  title: string;
  paragraphs: string[];
}

interface Testimonial {
  name: string;
  location: string;
  quote: string;
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
        className="bg-[#1E3A5F] text-white"
        headline={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* Official miracles */}
      <section className="bg-card">
        <div className="mx-auto max-w-4xl space-y-10 px-6 py-16 md:py-20">
          {miracles.map((miracle, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="border-l-4 border-secondary pl-6"
            >
              <Badge variant="secondary" className="mb-3 text-xs uppercase">
                {miracle.badge}
              </Badge>
              <p className="mb-4 font-serif text-xl italic text-foreground">
                {miracle.pullQuote}
              </p>
              <h3 className="mb-4 font-serif text-2xl font-semibold text-foreground">
                {miracle.title}
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
                {miracle.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.div>
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TestimonialCard
                name={item.name}
                location={item.location}
                quote={item.quote}
              />
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>

      {/* Share CTA */}
      <SectionContainer>
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {t("shareCta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
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
