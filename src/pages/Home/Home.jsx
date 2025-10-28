import BottomSection from "../../components/BottomSection/BottomSection";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import css from "./Home.module.css"


export default function Hero() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleNavigateToTeachers = () => {
        navigate('/teachers');
    };

    return (
        <>
            <Header />
            <section className={css.container}>
                <div className={css.hero}>
                    <div className={css.hero__content}>
                        <h1 className={css.hero__title}>
                            {t("home.title")} <span className={css.hero__accent}> {t("home.accent")}</span> {t("home.text")}
                        </h1>
                        <p className={css.hero__text}>
                            {t("home.subtext")}
                        </p>
                        <button className={css.hero__button} onClick={handleNavigateToTeachers}>
                            {t("home.btn")}
                        </button>
                    </div>
                    <div className={css.hero__image}>
                        <img src="/Banner.jpg" alt="Hero illustration" />
                    </div>
                </div>

            </section>
            <BottomSection />
        </>
    );
}

