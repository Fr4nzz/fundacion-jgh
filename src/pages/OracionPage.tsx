import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHero from "@/components/shared/PageHero";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import PrayerSection from "@/components/shared/PrayerSection";
import { useMobile } from "@/hooks/useMobile";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface Prayer {
  id: string;
  title: string;
  text: string;
}

interface NovenaDay {
  day: number;
  theme: string;
}

interface QuoteItem {
  topic: string;
  text: string;
}

export default function OracionPage() {
  const { t } = useTranslation("oracion");
  const isMobile = useMobile();
  const prayers = t("prayers", { returnObjects: true }) as Prayer[];
  const novenaDays = t("novena.days", { returnObjects: true }) as NovenaDay[];
  const quotes = t("quotes.items", { returnObjects: true }) as QuoteItem[];

  return (
    <>
      <PageHero compact headline={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* Prayers */}
      <SectionContainer>
        {isMobile ? (
          <Accordion type="single" collapsible className="space-y-2">
            {prayers.map((prayer) => (
              <AccordionItem key={prayer.id} value={prayer.id}>
                <AccordionTrigger className="font-serif text-base font-semibold">
                  {prayer.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-line font-serif text-sm italic leading-relaxed text-muted-foreground">
                    {prayer.text}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Tabs defaultValue={prayers[0]?.id} className="w-full">
            <TabsList className="mb-6 flex flex-wrap h-auto gap-1">
              {prayers.map((prayer) => (
                <TabsTrigger
                  key={prayer.id}
                  value={prayer.id}
                  className="text-xs"
                >
                  {prayer.title.replace(/\(.*\)/, "").trim()}
                </TabsTrigger>
              ))}
            </TabsList>
            {prayers.map((prayer) => (
              <TabsContent key={prayer.id} value={prayer.id}>
                <PrayerSection title={prayer.title} text={prayer.text} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </SectionContainer>

      {/* Novena */}
      <SectionContainer alt>
        <SectionHeading centered={false}>{t("novena.title")}</SectionHeading>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          {t("novena.intro")}
        </p>
        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              {t("novena.openingPrayerTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line font-serif text-sm italic leading-relaxed text-muted-foreground">
              {t("novena.openingPrayer")}
            </p>
          </CardContent>
        </Card>
        <ol className="space-y-3">
          {novenaDays.map((day) => (
            <li key={day.day} className="flex items-baseline gap-3">
              <span className="shrink-0 font-serif text-lg font-bold text-secondary">
                {day.day}
              </span>
              <span className="text-sm text-foreground">
                {day.theme}
              </span>
            </li>
          ))}
        </ol>
      </SectionContainer>

      {/* Famous quotes */}
      <SectionContainer>
        <SectionHeading>{t("quotes.title")}</SectionHeading>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {quotes.map((quote, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="border-l-3 border-secondary pl-4 py-2">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-secondary">
                  {quote.topic}
                </p>
                <p className="font-serif text-base italic leading-relaxed text-foreground">
                  &ldquo;{quote.text}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>

      {/* Hymn */}
      <SectionContainer alt>
        <SectionHeading centered={false}>{t("hymn.title")}</SectionHeading>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          {t("hymn.description")}
        </p>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="whitespace-pre-line text-center font-serif text-base italic leading-relaxed text-foreground">
              {t("hymn.chorus")}
            </p>
          </CardContent>
        </Card>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("hymn.listenNote")}
        </p>
      </SectionContainer>
    </>
  );
}
