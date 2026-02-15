import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageToggle() {
  const { i18n, t } = useTranslation("common");
  const current = i18n.language.startsWith("es") ? "es" : "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-sm">
          <Globe className="h-4 w-4" />
          {current.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("es")}>
          {t("lang.es")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
          {t("lang.en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
