import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <header>
      <h1>{t("welcome")}</h1>
      <nav>
        <a href="/teachers">{t("teachers")}</a>
        <a href="/favorites">{t("favorites")}</a>
      </nav>
      <button onClick={() => changeLanguage("ua")}>UA</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
    </header>
  );
}

export default Header;
