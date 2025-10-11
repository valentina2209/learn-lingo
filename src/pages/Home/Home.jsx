import BottomSection from "../../components/BottomSection/BottomSection";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import css from "./Home.module.css"


export default function Hero() {
    const navigate = useNavigate();

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
                            Unlock your potential with the best <span className={css.hero__accent}>language</span> tutors
                        </h1>
                        <p className={css.hero__text}>
                            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
                        </p>
                        <button className={css.hero__button} onClick={handleNavigateToTeachers}>
                            Get started
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

