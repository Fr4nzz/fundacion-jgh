import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface StickyDonateBannerProps {
  onDonate: () => void;
}

export default function StickyDonateBanner({ onDonate }: StickyDonateBannerProps) {
  const { t } = useTranslation("common");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-t border-white/10 bg-gradient-to-r from-[#2A4F7A] via-[#345f8f] to-[#2A4F7A] px-4 backdrop-blur-sm md:hidden">
      <span className="text-base text-white/90">{t("stickyBanner.text")}</span>
      <Button
        size="sm"
        variant="secondary"
        className="font-semibold"
        onClick={onDonate}
      >
        {t("stickyBanner.button")}
      </Button>
    </div>
  );
}
