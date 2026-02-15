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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {t("donate.modalTitle")}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {t("donate.modalBody")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Bank info card */}
          <div className="rounded-lg bg-[#1E3A5F] p-5 text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60">
              {t("donate.bankLabel")}
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">{t("donate.beneficiary")}</span>
                <span className="text-right font-medium text-white">
                  {FOUNDATION_NAME.split("Dr.")[0].trim()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">{t("donate.accountNumber")}</span>
                <span className="font-mono font-semibold text-[#C8A45C]">
                  {BANK_ACCOUNT}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">{t("donate.ruc")}</span>
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
