import { useTranslation } from "react-i18next";
import { Phone } from "lucide-react";
import { PHONE_1, PHONE_2 } from "@/lib/constants";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#1e3d6b] via-[#1a3560] to-[#152b4d] text-white/90">
      {/* Decorative cloud wisp */}
      <div
        className="pointer-events-none absolute -left-20 top-0 h-32 w-48 rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse at center, white 0%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />
      {/* Top divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white">
              {t("footer.name")}
            </h3>
            <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-secondary/50 to-transparent" />
            <p className="text-base text-white/70">{t("footer.sede")}</p>
            <p className="text-base text-white/70">{t("footer.location")}</p>
            <div className="flex items-center gap-2 text-base text-white/70">
              <Phone className="h-4 w-4" />
              <span>{PHONE_1} / {PHONE_2}</span>
            </div>
            <p className="mt-4 text-xs text-white/40">
              {t("footer.acuerdo")}
            </p>
          </div>

          {/* Right column - quote */}
          <div className="flex flex-col justify-center">
            <blockquote className="rounded-xl border-l-2 border-secondary/40 bg-white/5 py-4 pl-4 pr-3 backdrop-blur-sm">
              <p className="font-serif text-base italic leading-relaxed text-white/80">
                {t("footer.quote")}
              </p>
              <cite className="mt-2 block text-sm font-medium not-italic text-sunrise-warm">
                {t("footer.quoteAttribution")}
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </footer>
  );
}
