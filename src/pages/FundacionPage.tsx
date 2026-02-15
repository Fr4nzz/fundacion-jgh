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
import { fadeUp, staggerContainer } from "@/lib/animations";
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

  return (
    <>
      {/* Hero with real Archidona photo */}
      <section className="bg-muted">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-4"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full shrink-0 md:w-80"
          >
            <img
              src={import.meta.env.BASE_URL + "images/integrantes-devotos.jpeg"}
              alt="Integrantes de la Fundación"
              className="rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <SectionContainer>
        <SectionHeading centered={false}>{t("mission.title")}</SectionHeading>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {missionParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {activities.map((item, i) => {
            const Icon = ACTIVITY_ICONS[i];
            return (
              <motion.div key={i} variants={fadeUp}>
                <Card className="border-border h-full">
                  <CardContent className="flex gap-4 pt-6">
                    <Icon className="h-6 w-6 shrink-0 text-secondary" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 overflow-hidden rounded-lg"
        >
          <img
            src={import.meta.env.BASE_URL + "images/integrantes-devotos-2.jpeg"}
            alt="Actividades de la Fundación"
            className="w-full object-cover"
          />
        </motion.div>
      </SectionContainer>

      {/* Ecuador connection */}
      <SectionContainer>
        <SectionHeading centered={false}>
          {t("ecuadorConnection.title")}
        </SectionHeading>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {ecuadorParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </SectionContainer>

      {/* Donation section */}
      <section className="bg-[#1E3A5F] text-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-4xl px-6 py-16 md:py-20"
        >
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            {t("donate.title")}
          </h2>
          <p className="mt-2 text-lg text-white/80">{t("donate.heading")}</p>
          <p className="mt-4 text-base text-white/70">{t("donate.body")}</p>

          {/* Bank card */}
          <div className="mt-8 rounded-lg bg-white/10 p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60">
              {t("donate.bankLabel")}
            </p>
            <div className="mt-3 space-y-1 font-mono text-sm">
              <p>
                {t("donate.accountLabel")}:{" "}
                <span className="font-semibold text-[#C8A45C]">
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
              <ul className="space-y-2 text-sm text-white/80">
                {otherItems.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">{t("donate.contact")}</h3>
              <div className="flex items-center gap-2 text-sm text-white/80">
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
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("legal.body")}
        </p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="space-y-1 text-sm text-foreground">
            <p className="font-semibold">{t("legal.boardTitle")}</p>
            <p>{t("legal.president")}</p>
            <p>{t("legal.secretary")}</p>
          </div>
          <div className="w-48 shrink-0">
            <img
              src={
                import.meta.env.BASE_URL +
                "images/amable-y-narcisa-villarroel.jpeg"
              }
              alt="José Amable Villarroel y Narcisa Villarroel"
              className="rounded-lg"
            />
          </div>
        </div>
      </SectionContainer>

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
    </>
  );
}
