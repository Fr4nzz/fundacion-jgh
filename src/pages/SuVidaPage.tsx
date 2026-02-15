import { useTranslation } from "react-i18next";
import PageHero from "@/components/shared/PageHero";
import TimelineItem from "@/components/shared/TimelineItem";
import TextWithRefs from "@/components/shared/TextWithRefs";
import ReferencesSection from "@/components/shared/ReferencesSection";

interface TimelineSection {
  date: string;
  title: string;
  paragraphs: string[];
}

export default function SuVidaPage() {
  const { t } = useTranslation("su-vida");
  const sections = t("sections", { returnObjects: true }) as TimelineSection[];
  const references = t("references.items", { returnObjects: true }) as any[];

  return (
    <>
      <PageHero compact>
        <div className="flex flex-col items-center gap-8 md:flex-row md:text-left">
          <div className="flex-1">
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="w-48 shrink-0 md:w-64">
            <img
              src={import.meta.env.BASE_URL + "images/biografia-jose-gregorio-main.png"}
              alt="San José Gregorio Hernández"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </PageHero>

      <section className="bg-card">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          {sections.map((section, i) => (
            <TimelineItem
              key={i}
              date={section.date || undefined}
              title={section.title}
            >
              {section.paragraphs.map((p, j) => (
                <p key={j}><TextWithRefs text={p} references={references} /></p>
              ))}
            </TimelineItem>
          ))}
        </div>
      </section>

      <ReferencesSection
        title={t("references.title")}
        items={t("references.items", { returnObjects: true }) as any[]}
      />
    </>
  );
}
