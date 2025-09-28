import BottomSection from "../../components/BottomSection/BottomSection";
import Header from "../../components/Header/Header";
import css from "./Home.module.css"


export default function Hero() {
    return (
        <>
            <Header />
            <section className={css.hero}>
                <div className={css.hero__text}>
                    <h1>
                        Unlock your potential with the best <span>language</span> tutors
                    </h1>
                    <p>
                        Embark on an exciting journey with expert tutors. Elevate your skills
                        by learning from professionals worldwide.
                    </p>
                    <button className={css.btn_primary}>Get started</button>
                </div>
                <div className={css.hero__image}>
                    <img src="/Banner.jpg" alt="Hero illustration" />
                </div>
            </section>
            <BottomSection />
        </>
    );
}

