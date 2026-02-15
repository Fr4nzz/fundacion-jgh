import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Cross, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import PageHero from "@/components/shared/PageHero";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import QuoteBlock from "@/components/shared/QuoteBlock";
import DonationModal from "@/components/shared/DonationModal";
import ReferencesSection from "@/components/shared/ReferencesSection";
import TextWithRefs from "@/components/shared/TextWithRefs";
import { useCountUp } from "@/hooks/useCountUp";
import { fadeUp, staggerContainer } from "@/lib/animations";

const PILLAR_ICONS = [Cross, BookOpen, Heart] as const;
const PILLAR_KEYS = ["faith", "science", "charity"] as const;

export default function HomePage() {
  const { t } = useTranslation("home");
  const [donateOpen, setDonateOpen] = useState(false);
  const { count, ref: counterRef } = useCountUp(2100, 2000);
  const references = t("references.items", { returnObjects: true }) as any[];

  return (
    <>
      <PageHero
        headline={[t("hero.headline1"), t("hero.headline2")]}
        subtitle={t("hero.subtitle")}
        primaryCta={{ label: t("hero.ctaPrimary"), to: "/su-vida" }}
        secondaryCta={{
          label: t("hero.ctaSecondary"),
          onClick: () => setDonateOpen(true),
        }}
        backgroundImage={import.meta.env.BASE_URL + "images/hero-jose-gregorio.webp"}
      />

      {/* Three pillars */}
      <SectionContainer>
        <SectionHeading>{t("pillars.title")}</SectionHeading>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {PILLAR_KEYS.map((key, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <motion.div key={key} variants={fadeUp}>
                <Card className="border-border border-b-3 border-b-secondary h-full">
                  <CardContent className="pt-6 text-center">
                    <Icon className="mx-auto mb-4 h-8 w-8 text-secondary" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t(`pillars.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <TextWithRefs text={t(`pillars.${key}.description`)} references={references} />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionContainer>

      {/* Stat counter */}
      <SectionContainer alt>
        <div ref={counterRef} className="text-center">
          <Separator className="mx-auto mb-8 w-16 bg-secondary" />
          <p className="font-serif text-5xl font-bold text-primary md:text-6xl">
            + {count.toLocaleString()}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            <TextWithRefs text={t("stat.label")} references={references} />
          </p>
          <Separator className="mx-auto mt-8 w-16 bg-secondary" />
        </div>
      </SectionContainer>

      {/* Donation CTA */}
      <section className="bg-[#1E3A5F] text-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20"
        >
          <h2 className="font-serif text-2xl font-bold leading-tight md:text-3xl">
            {t("cta.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {t("cta.body")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold"
              onClick={() => setDonateOpen(true)}
            >
              {t("cta.buttonDonate")}
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <Link to="/la-fundacion">{t("cta.buttonLearn")}</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Closing quote */}
      <SectionContainer>
        <QuoteBlock
          text={t("closingQuote.text")}
          attribution={t("closingQuote.attribution")}
        />
      </SectionContainer>

      <ReferencesSection
        title={t("references.title")}
        items={t("references.items", { returnObjects: true }) as any[]}
      />

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
    </>
  );
}
