import { useTranslation } from "react-i18next";
import { Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CopyButton from "./CopyButton";
import {
  BANK_ACCOUNT,
  BANK_RUC,
  FOUNDATION_NAME,
  PHONE_1,
  PHONE_2,
} from "@/lib/constants";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DonationModal({ open, onOpenChange }: DonationModalProps) {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl bg-[#f3f7fc] border-white/70 shadow-[0_8px_40px_rgba(90,130,180,0.2)]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {t("donate.modalTitle")}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {t("donate.modalBody")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Bank info card — celestial dark */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2A4F7A] via-[#345f8f] to-[#3B6B9C] p-5 text-white">
            {/* Subtle cloud wisp */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-40 rounded-full opacity-10"
              style={{
                background: "radial-gradient(ellipse at center, white 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {t("donate.bankLabel")}
            </p>
            <div className="relative mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">{t("donate.beneficiary")}</span>
                <span className="text-right font-medium text-white">
                  {FOUNDATION_NAME.split("Dr.")[0].trim()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">{t("donate.accountNumber")}</span>
                <span className="font-mono font-semibold text-sunrise-warm">
                  {BANK_ACCOUNT}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">{t("donate.ruc")}</span>
                <span className="font-mono text-white">{BANK_RUC}</span>
              </div>
            </div>
            <div className="mt-4">
              <CopyButton text={BANK_ACCOUNT} />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              {t("donate.otherMeans")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("donate.callUs")}:
            </p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{PHONE_1} / {PHONE_2}</span>
            </div>
          </div>

          <p className="text-center text-sm italic text-muted-foreground">
            {t("donate.everyDonation")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
