import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import uaTranslation from "./locales/ua/translation.json";
import enTranslation from "./locales/en/translation.json";

const resources = {
    en: {
        translation: enTranslation
    },
    ua: {
        translation: uaTranslation
    }
};

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    lng: "en",

    detection: {
        order: ["cookie", "localStorage", "navigator"],
        caches: ["cookie"],
    },

    interpolation: {
        escapeValue: false,
    }
})

export default i18n;
