import { HashRouter, Routes, Route } from "react-router";
import PageLayout from "@/components/layout/PageLayout";
import HomePage from "@/pages/HomePage";
import SuVidaPage from "@/pages/SuVidaPage";
import AltaresPage from "@/pages/AltaresPage";
import MilagrosPage from "@/pages/MilagrosPage";
import FundacionPage from "@/pages/FundacionPage";
import OracionPage from "@/pages/OracionPage";

export default function App() {
  return (
    <HashRouter>
      <PageLayout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="su-vida" element={<SuVidaPage />} />
          <Route path="de-los-altares" element={<AltaresPage />} />
          <Route path="milagros" element={<MilagrosPage />} />
          <Route path="la-fundacion" element={<FundacionPage />} />
          <Route path="oracion" element={<OracionPage />} />
        </Routes>
      </PageLayout>
    </HashRouter>
  );
}
