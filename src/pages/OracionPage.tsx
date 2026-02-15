import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
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
import { fadeUp, staggerContainer, hoverLift } from "@/lib/animations";

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

interface HymnVideo {
  label: string;
  videoId: string;
  artist: string;
}

interface HymnResource {
  name: string;
  url: string;
}

function HymnPlayer() {
  const { t } = useTranslation("oracion");
  const videos = t("hymn.videos", { returnObjects: true }) as HymnVideo[];
  const [activeId, setActiveId] = useState(videos[0]?.videoId ?? "");

  if (!Array.isArray(videos) || videos.length === 0) return null;

  return (
    <div className="mt-8">
      {/* Tab buttons */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {videos.map((v) => (
          <button
            key={v.videoId}
            onClick={() => setActiveId(v.videoId)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
              activeId === v.videoId
                ? "border-secondary bg-secondary text-secondary-foreground shadow-[0_2px_10px_rgba(212,162,69,0.2)]"
                : "border-border bg-white/40 text-muted-foreground hover:border-secondary/50 hover:bg-white/60"
            }`}
          >
            {v.label}
            <span className="ml-1 opacity-60">— {v.artist}</span>
          </button>
        ))}
      </div>

      {/* YouTube embed */}
      <div className="relative w-full overflow-hidden rounded-xl border border-border/50" style={{ paddingBottom: "56.25%" }}>
        <iframe
          key={activeId}
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${activeId}`}
          title={videos.find((v) => v.videoId === activeId)?.label ?? ""}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
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
        <Card className="mb-6">
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
              <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-celestial/15 to-secondary/15 font-serif text-sm font-bold text-secondary">
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
            <motion.div key={i} variants={fadeUp} whileHover={hoverLift}>
              <div className="rounded-xl glass-subtle p-4 border-l-3 border-secondary/40">
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
        <Card>
          <CardContent className="pt-6">
            <p className="whitespace-pre-line text-center font-serif text-base italic leading-relaxed text-foreground">
              {t("hymn.chorus")}
            </p>
          </CardContent>
        </Card>

        {/* Embedded YouTube player with tabs */}
        <HymnPlayer />

        {/* Extra resources */}
        {(() => {
          const resources = t("hymn.resources", { returnObjects: true }) as HymnResource[];
          return Array.isArray(resources) && resources.length > 0 ? (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-foreground">
                {t("hymn.resourcesLabel")}
              </p>
              <ul className="space-y-1.5">
                {resources.map((res, i) => (
                  <li key={i}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-secondary transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      {res.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null;
        })()}
      </SectionContainer>
    </>
  );
}
