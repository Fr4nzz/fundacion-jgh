import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 border-white/40 text-white hover:bg-white/10"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {t("donate.copied")}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {t("donate.copy")}
        </>
      )}
    </Button>
  );
}
