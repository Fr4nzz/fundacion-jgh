import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Cross, Heart, BookOpen, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import QuoteBlock from "@/components/shared/QuoteBlock";
import CopyButton from "@/components/shared/CopyButton";
import DonationModal from "@/components/shared/DonationModal";
import ReferencesSection from "@/components/shared/ReferencesSection";
import TextWithRefs from "@/components/shared/TextWithRefs";
import { useDirectionalInView } from "@/hooks/useDirectionalInView";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/animations";
import {
  BANK_ACCOUNT,
  BANK_RUC,
  PHONE_1,
  PHONE_2,
} from "@/lib/constants";

const ACTIVITY_ICONS = [Cross, Heart, BookOpen, MapPin];

interface Activity {
  title: string;
  description: string;
}

export default function FundacionPage() {
  const { t } = useTranslation("fundacion");
  const [donateOpen, setDonateOpen] = useState(false);
  const { ref: donateRef, isInView: donateInView } = useDirectionalInView("-80px");
  const activities = t("activities.items", {
    returnObjects: true,
  }) as Activity[];
  const missionParagraphs = t("mission.paragraphs", {
    returnObjects: true,
  }) as string[];
  const ecuadorParagraphs = t("ecuadorConnection.paragraphs", {
    returnObjects: true,
  }) as string[];
  const otherItems = t("donate.otherItems", {
    returnObjects: true,
  }) as string[];
  const references = t("references.items", { returnObjects: true }) as any[];

  return (
    <>
      {/* Hero with real Archidona photo */}
      <section className="bg-sky-mist">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t("hero.title")}
            </h1>
            <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60" />
            <p className="text-xl leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <img
            src={import.meta.env.BASE_URL + "images/integrantes-devotos.jpeg"}
            alt="Integrantes de la Fundación"
            className="w-full max-h-[24rem] object-cover object-[50%_40%]"
          />
        </motion.div>
      </section>

      {/* Mission */}
      <SectionContainer>
        <SectionHeading centered={false}>{t("mission.title")}</SectionHeading>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {missionParagraphs.map((p, i) => (
            <p key={i}><TextWithRefs text={p} references={references} /></p>
          ))}
        </div>
        <div className="mt-8">
          <QuoteBlock
            text={t("quote.text")}
            attribution={t("quote.attribution")}
          />
        </div>
      </SectionContainer>

      {/* Activities */}
      <SectionContainer alt>
        <SectionHeading>{t("activities.title")}</SectionHeading>
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {activities.map((item, i) => {
            const Icon = ACTIVITY_ICONS[i];
            return (
              <motion.div key={i} variants={fadeUp} whileHover={hoverLift}>
                <Card className="h-full">
                  <CardContent className="flex gap-4 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-celestial/10 to-secondary/10">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Second real photo */}
        <motion.div
          variants={fadeUp}
          className="mt-10 overflow-hidden rounded-2xl"
        >
          <img
            src={import.meta.env.BASE_URL + "images/integrantes-devotos-2.jpeg"}
            alt="Actividades de la Fundación"
            className="w-full max-h-[24rem] object-cover"
          />
        </motion.div>
      </SectionContainer>

      {/* Ecuador connection */}
      <SectionContainer>
        <SectionHeading centered={false}>
          {t("ecuadorConnection.title")}
        </SectionHeading>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {ecuadorParagraphs.map((p, i) => (
            <p key={i}><TextWithRefs text={p} references={references} /></p>
          ))}
        </div>
      </SectionContainer>

      {/* Donation section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2A4F7A] via-[#345f8f] to-[#3B6B9C] text-white">
        {/* Cloud wisps */}
        <div
          className="pointer-events-none absolute -right-20 -top-10 h-48 w-64 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse at center, white 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "cloud-float-1 12s ease-in-out infinite",
          }}
        />
        <motion.div
          ref={donateRef}
          variants={fadeUp}
          initial="hidden"
          animate={donateInView ? "visible" : "hidden"}
          className="relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-20"
        >
          <h2 className="font-serif text-3xl font-bold md:text-3xl">
            {t("donate.title")}
          </h2>
          <p className="mt-2 text-xl text-white/80">{t("donate.heading")}</p>
          <p className="mt-4 text-lg text-white/70">{t("donate.body")}</p>

          {/* Bank card — glass on dark */}
          <div className="mt-8 rounded-xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60">
              {t("donate.bankLabel")}
            </p>
            <div className="mt-3 space-y-1 font-mono text-sm">
              <p>
                {t("donate.accountLabel")}:{" "}
                <span className="font-semibold text-sunrise-warm">
                  {BANK_ACCOUNT}
                </span>
              </p>
              <p>
                RUC: <span className="text-white">{BANK_RUC}</span>
              </p>
            </div>
            <div className="mt-4">
              <CopyButton text={BANK_ACCOUNT} />
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold">{t("donate.otherWays")}</h3>
              <ul className="space-y-2 text-lg text-white/80">
                {otherItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">{t("donate.contact")}</h3>
              <div className="flex items-center gap-2 text-lg text-white/80">
                <Phone className="h-4 w-4" />
                <span>
                  {PHONE_1} / {PHONE_2}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold"
              onClick={() => setDonateOpen(true)}
            >
              {t("donate.donateNow")}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Legal */}
      <SectionContainer alt>
        <SectionHeading centered={false}>{t("legal.title")}</SectionHeading>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {t("legal.body")}
        </p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="space-y-1 text-lg text-foreground">
            <p className="font-semibold">{t("legal.boardTitle")}</p>
            <p>{t("legal.president")}</p>
            <p>{t("legal.secretary")}</p>
          </div>
          <div className="w-56 shrink-0">
            <img
              src={
                import.meta.env.BASE_URL +
                "images/amable-y-narcisa-villarroel.jpeg"
              }
              alt="José Amable Villarroel y Narcisa Villarroel"
              className="rounded-xl ring-1 ring-white/50"
            />
          </div>
        </div>
      </SectionContainer>

      <ReferencesSection
        title={t("references.title")}
        items={t("references.items", { returnObjects: true }) as any[]}
      />

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
    </>
  );
}
