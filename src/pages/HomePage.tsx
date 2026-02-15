import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Cross, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import PageHero from "@/components/shared/PageHero";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import QuoteBlock from "@/components/shared/QuoteBlock";
import DonationModal from "@/components/shared/DonationModal";
import ReferencesSection from "@/components/shared/ReferencesSection";
import TextWithRefs from "@/components/shared/TextWithRefs";
import { useCountUp } from "@/hooks/useCountUp";
import { useDirectionalInView } from "@/hooks/useDirectionalInView";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/animations";

const PILLAR_ICONS = [Cross, BookOpen, Heart] as const;
const PILLAR_KEYS = ["faith", "science", "charity"] as const;

export default function HomePage() {
  const { t } = useTranslation("home");
  const [donateOpen, setDonateOpen] = useState(false);
  const { count, ref: counterRef } = useCountUp(2100, 2000);
  const { ref: ctaRef, isInView: ctaInView } = useDirectionalInView("-80px");
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
          className="grid gap-8 md:grid-cols-3"
        >
          {PILLAR_KEYS.map((key, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <motion.div key={key} variants={fadeUp} whileHover={hoverLift}>
                <Card className="h-full border-b-2 border-b-secondary/40">
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-celestial/10 to-secondary/10">
                      <Icon className="h-8 w-8 md:h-7 md:w-7 text-secondary" />
                    </div>
                    <h3 className="mb-2 text-2xl md:text-xl font-semibold text-foreground">
                      {t(`pillars.${key}.title`)}
                    </h3>
                    <p className="text-xl md:text-lg leading-relaxed text-muted-foreground">
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
          <div className="mx-auto mb-8 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent" />
          <p className="font-serif text-5xl font-bold text-primary md:text-6xl">
            + {count.toLocaleString()}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-2xl md:text-xl leading-relaxed text-muted-foreground">
            <TextWithRefs text={t("stat.label")} references={references} />
          </p>
          <div className="mx-auto mt-8 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </div>
      </SectionContainer>

      {/* Donation CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2A4F7A] via-[#345f8f] to-[#3B6B9C] text-white">
        {/* Decorative cloud wisps */}
        <div
          className="pointer-events-none absolute -left-20 top-0 h-40 w-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse at center, white 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "cloud-float-1 12s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-32 w-48 rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse at center, white 0%, transparent 70%)",
            filter: "blur(25px)",
            animation: "cloud-float-2 15s ease-in-out infinite",
          }}
        />

        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center md:py-20"
        >
          <h2 className="font-serif text-4xl md:text-3xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            {t("cta.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl md:text-lg leading-relaxed text-white/80">
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
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60"
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
