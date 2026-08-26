import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Image as ImageIcon, Play } from "lucide-react";
import {
  GALLERY_MEDIA,
  type GalleryMediaItem,
} from "@/lib/galleryMedia";

const mediaById = Object.fromEntries(
  GALLERY_MEDIA.map((item) => [item.id, item]),
) as Record<GalleryMediaItem["id"], GalleryMediaItem>;

interface MediaFigureProps {
  item: GalleryMediaItem;
  dark?: boolean;
  priority?: boolean;
  className?: string;
}

function MediaFigure({ item, dark = false, priority = false, className = "" }: MediaFigureProps) {
  const { t } = useTranslation("gallery");
  const isVideo = item.kind === "video";

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl border shadow-[0_24px_70px_rgba(36,65,101,0.14)] ${
          dark ? "border-white/15 bg-[#112b4f]" : "border-white/80 bg-white/60"
        }`}
      >
        {isVideo ? (
          <video
            className="mx-auto block aspect-[478/850] w-full bg-[#102744] object-contain focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary focus-visible:ring-offset-4"
            controls
            playsInline
            preload="none"
            poster={item.poster}
            aria-label={t(`items.${item.id}.label`)}
          >
            <source src={item.src} type="video/mp4" />
            {t(`items.${item.id}.description`)}
          </video>
        ) : (
          <img
            src={item.src}
            alt={t(`items.${item.id}.alt`)}
            className="aspect-[4/3] w-full object-cover"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20"
        />
      </div>

      <figcaption className={`mt-5 ${dark ? "text-white" : "text-foreground"}`}>
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-sunrise-warm" : "text-primary"
          }`}
        >
          <span>{t(`items.${item.id}.theme`)}</span>
          <span aria-hidden="true" className={dark ? "text-white/30" : "text-secondary/70"}>•</span>
          <span className={`inline-flex items-center gap-1.5 ${dark ? "text-white/65" : "text-muted-foreground"}`}>
            {isVideo ? <Play className="h-3 w-3" aria-hidden="true" /> : <ImageIcon className="h-3 w-3" aria-hidden="true" />}
            {t(isVideo ? "meta.video" : "meta.photo")}
            {item.duration ? ` · ${t("meta.duration", { duration: item.duration })}` : ""}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight md:text-3xl">
          {t(`items.${item.id}.title`)}
        </h3>
        <p className={`mt-3 max-w-xl text-base leading-7 ${dark ? "text-white/72" : "text-muted-foreground"}`}>
          {t(`items.${item.id}.description`)}
        </p>
      </figcaption>
    </figure>
  );
}

function ChapterHeading({ chapter }: { chapter: "prayer" | "devotion" | "community" }) {
  const { t } = useTranslation("gallery");

  return (
    <div className="relative max-w-2xl pl-8 md:pl-12">
      <span className="absolute left-0 top-1 font-serif text-sm text-secondary" aria-hidden="true">
        {t(`chapters.${chapter}.number`)}
      </span>
      <div className="absolute left-0 top-7 h-px w-5 bg-secondary/80 md:w-8" aria-hidden="true" />
      <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
        {t(`chapters.${chapter}.title`)}
      </h2>
      <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
        {t(`chapters.${chapter}.intro`)}
      </p>
    </div>
  );
}

export default function GalleryPage() {
  const { t } = useTranslation("gallery");
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } };
  const transition = reduceMotion ? undefined : { duration: 0.65, ease: "easeOut" as const };

  return (
    <main className="overflow-hidden bg-[#f4f7fa]">
      <section className="relative bg-sky-mist" data-gallery-section="hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(242,192,120,0.13),transparent_68%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pb-14 pt-12 md:pb-16 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-20" data-gallery-content="hero">
          <motion.div
            {...reveal}
            transition={transition}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl font-bold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <div className="mt-6 h-px w-20 bg-gradient-to-r from-secondary to-secondary/10" />
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              {t("hero.intro")}
            </p>
            <a
              href="#gallery-stories"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/20 bg-white/55 px-5 py-2.5 text-sm font-semibold text-primary no-underline transition-colors hover:border-primary/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              {t("hero.scrollLabel")}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            {...reveal}
            transition={transition ? { ...transition, delay: 0.1 } : undefined}
            className="lg:col-span-7"
          >
            <MediaFigure item={mediaById.gathering} priority />
          </motion.div>
        </div>
      </section>

      <div id="gallery-stories" className="relative mx-auto max-w-6xl scroll-mt-20 px-6">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[1.55rem] top-24 hidden w-px bg-gradient-to-b from-secondary/0 via-secondary/35 to-secondary/0 lg:block"
        />

        <section aria-labelledby="chapter-prayer" data-gallery-section="prayer">
          <div id="chapter-prayer">
            <ChapterHeading chapter="prayer" />
          </div>
          <motion.div
            initial={false}
            transition={transition}
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            data-gallery-content="prayer"
          >
            <MediaFigure item={mediaById.songs} className="mx-auto w-full max-w-[23rem] lg:col-span-5" />
            <blockquote className="relative lg:col-span-6 lg:col-start-7">
              <div className="h-px w-12 bg-secondary/70" aria-hidden="true" />
              <p className="mt-6 font-serif text-2xl italic leading-relaxed text-foreground/85 md:text-3xl">
                “{t("chapters.prayer.editorial")}”
              </p>
            </blockquote>
          </motion.div>
        </section>

        <section className="mt-16 md:mt-20" aria-labelledby="chapter-devotion" data-gallery-section="devotion">
          <div id="chapter-devotion">
            <ChapterHeading chapter="devotion" />
          </div>
          <motion.div
            initial={false}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
            className="mx-auto mt-8 grid max-w-[43rem] items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12"
            data-gallery-content="devotion"
          >
            <MediaFigure item={mediaById.flowers} className="mx-auto w-full max-w-[20rem]" />
            <MediaFigure item={mediaById.preparation} className="mx-auto w-full max-w-[20rem]" />
          </motion.div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a365f] via-[#234a78] to-[#2f6494] text-white" aria-labelledby="chapter-community" data-gallery-section="community">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-28 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(242,192,120,0.12),transparent_66%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-14 md:pt-16">
          <div id="chapter-community" className="max-w-2xl">
            <div className="flex items-center gap-4 text-sunrise-warm">
              <span className="font-serif text-sm" aria-hidden="true">{t("chapters.community.number")}</span>
              <span className="h-px w-10 bg-current" aria-hidden="true" />
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">
              {t("chapters.community.title")}
            </h2>
            <p className="mt-3 text-base leading-7 text-white/72 md:text-lg">
              {t("chapters.community.intro")}
            </p>
          </div>

          <motion.div
            initial={false}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
            data-gallery-content="community"
          >
            <MediaFigure item={mediaById.prayer} dark className="mx-auto w-full max-w-[22rem] lg:col-span-5" />
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sunrise-warm">
                {t("closing.eyebrow")}
              </p>
              <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-4xl">
                {t("closing.title")}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/72 md:text-lg">
                {t("closing.body")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
