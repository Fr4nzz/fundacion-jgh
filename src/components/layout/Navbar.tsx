import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = [
  { key: "suVida", to: "/su-vida" },
  { key: "altares", to: "/de-los-altares" },
  { key: "milagros", to: "/milagros" },
  { key: "fundacion", to: "/la-fundacion" },
  { key: "oracion", to: "/oracion" },
  { key: "gallery", to: "/galeria" },
] as const;

interface NavbarProps {
  onDonate: () => void;
}

export default function Navbar({ onDonate }: NavbarProps) {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => location.pathname === to;

  return (
    <header className="sticky top-0 z-50 glass-strong border-b-0">
      {/* Subtle golden line at top */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <img
            src={import.meta.env.BASE_URL + "images/logo.png"}
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-secondary/20 transition-shadow duration-500 group-hover:ring-secondary/50 group-hover:shadow-[0_0_15px_rgba(212,162,69,0.2)]"
          />
          <span className="hidden font-serif text-sm font-semibold text-foreground md:block lg:text-base">
            Fundación Dr. José Gregorio Hernández 3M
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium tracking-wide no-underline transition-all duration-300 hover:bg-white/40 ${
                isActive(link.to)
                  ? "text-primary font-semibold bg-white/30"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t(`nav.${link.key}`)}
              {isActive(link.to) && (
                <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60" />
              )}
            </Link>
          ))}
          <LanguageToggle />
          <Button size="sm" className="ml-2" onClick={onDonate}>
            {t("nav.donate")}
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <Button size="sm" onClick={onDonate}>
            {t("nav.donate")}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              overlayClassName="bg-[#102744]/60 backdrop-blur-[2px]"
              className="w-[min(20rem,88vw)] border-l border-primary/15 bg-[#f7fafc] pt-12 text-foreground shadow-[-24px_0_60px_rgba(16,39,68,0.24)]"
            >
              <SheetTitle className="sr-only">Navegación</SheetTitle>
              <nav className="flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className={`min-h-11 rounded-lg px-4 py-2.5 text-base no-underline transition-colors duration-200 hover:bg-primary/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive("/") ? "bg-primary/10 font-semibold text-primary" : "text-foreground"
                  }`}
                >
                  {t("nav.home")}
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`min-h-11 rounded-lg px-4 py-2.5 text-base no-underline transition-colors duration-200 hover:bg-primary/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      isActive(link.to)
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
