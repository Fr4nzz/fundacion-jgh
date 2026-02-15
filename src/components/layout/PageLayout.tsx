import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyDonateBanner from "./StickyDonateBanner";
import DonationModal from "@/components/shared/DonationModal";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onDonate={() => setDonateOpen(true)} />
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <Footer />
      <StickyDonateBanner onDonate={() => setDonateOpen(true)} />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
    </div>
  );
}
