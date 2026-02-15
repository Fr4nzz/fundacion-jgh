import { useTranslation } from "react-i18next";
import { Phone } from "lucide-react";
import { PHONE_1, PHONE_2 } from "@/lib/constants";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-[#132840] text-white/90">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white">
              {t("footer.name")}
            </h3>
            <p className="text-sm text-white/70">{t("footer.sede")}</p>
            <p className="text-sm text-white/70">{t("footer.location")}</p>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone className="h-4 w-4" />
              <span>{PHONE_1} / {PHONE_2}</span>
            </div>
            <p className="mt-4 text-xs text-white/50">
              {t("footer.acuerdo")}
            </p>
          </div>

          {/* Right column - quote */}
          <div className="flex flex-col justify-center">
            <blockquote className="border-l-2 border-[#C8A45C]/40 pl-4">
              <p className="font-serif text-base italic leading-relaxed text-white/80">
                {t("footer.quote")}
              </p>
              <cite className="mt-2 block text-sm font-medium not-italic text-[#C8A45C]">
                {t("footer.quoteAttribution")}
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </footer>
  );
}
