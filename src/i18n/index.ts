import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esSuVida from "./locales/es/su-vida.json";
import esAltares from "./locales/es/altares.json";
import esMilagros from "./locales/es/milagros.json";
import esFundacion from "./locales/es/fundacion.json";
import esOracion from "./locales/es/oracion.json";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enSuVida from "./locales/en/su-vida.json";
import enAltares from "./locales/en/altares.json";
import enMilagros from "./locales/en/milagros.json";
import enFundacion from "./locales/en/fundacion.json";
import enOracion from "./locales/en/oracion.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        common: esCommon,
        home: esHome,
        "su-vida": esSuVida,
        altares: esAltares,
        milagros: esMilagros,
        fundacion: esFundacion,
        oracion: esOracion,
      },
      en: {
        common: enCommon,
        home: enHome,
        "su-vida": enSuVida,
        altares: enAltares,
        milagros: enMilagros,
        fundacion: enFundacion,
        oracion: enOracion,
      },
    },
    lng: localStorage.getItem("lang") || "es",
    fallbackLng: "es",
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
