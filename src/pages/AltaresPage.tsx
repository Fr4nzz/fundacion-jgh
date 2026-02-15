import { useTranslation } from "react-i18next";
import PageHero from "@/components/shared/PageHero";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import TimelineItem from "@/components/shared/TimelineItem";
import TextWithRefs from "@/components/shared/TextWithRefs";
import ReferencesSection from "@/components/shared/ReferencesSection";

interface TimelineEvent {
  year: string;
  event: string;
}

interface NarrativeSection {
  title: string;
  paragraphs: string[];
}

export default function AltaresPage() {
  const { t } = useTranslation("altares");
  const timeline = t("timeline", { returnObjects: true }) as TimelineEvent[];
  const beatificacion = t("beatificacion", { returnObjects: true }) as NarrativeSection;
  const canonizacion = t("canonizacion", { returnObjects: true }) as NarrativeSection;
  const porQueImporta = t("porQueImporta", { returnObjects: true }) as NarrativeSection;
  const references = t("references.items", { returnObjects: true }) as any[];

  return (
    <>
      <PageHero compact headline={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* Chronology timeline */}
      <section className="bg-transparent">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-20">
          {timeline.map((item, i) => (
            <TimelineItem key={i} date={item.year} title={<TextWithRefs text={item.event} references={references} />}>
              {null}
            </TimelineItem>
          ))}
        </div>
      </section>

      {/* Beatificación */}
      <SectionContainer alt>
        <SectionHeading centered={false}>{beatificacion.title}</SectionHeading>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {beatificacion.paragraphs.map((p, i) => (
            <p key={i}><TextWithRefs text={p} references={references} /></p>
          ))}
        </div>
      </SectionContainer>

      {/* Canonización */}
      <SectionContainer>
        <SectionHeading centered={false}>{canonizacion.title}</SectionHeading>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {canonizacion.paragraphs.map((p, i) => (
            <p key={i}><TextWithRefs text={p} references={references} /></p>
          ))}
        </div>
      </SectionContainer>

      {/* Por qué importa */}
      <SectionContainer alt>
        <SectionHeading centered={false}>{porQueImporta.title}</SectionHeading>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {porQueImporta.paragraphs.map((p, i) => (
            <p key={i}><TextWithRefs text={p} references={references} /></p>
          ))}
        </div>
      </SectionContainer>

      <ReferencesSection
        title={t("references.title")}
        items={t("references.items", { returnObjects: true }) as any[]}
      />
    </>
  );
}
