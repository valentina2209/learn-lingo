import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ua from "./locales/ua/translation.json";
import en from "./locales/en/translation.json";

const savedLang = localStorage.getItem("lang") || "ua";

i18n.use(initReactI18next).init({
    resources: {
        ua: { translation: ua },
        en: { translation: en },
    },
    lng: savedLang,
    fallbackLng: "ua",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
