import css from './BottomSection.module.css';

export default function BottomSection() {
    return (
        <section className={css.container}>
            <div className={css.bottom}>
                <div className={css.wrapper}>
                    <span className={css.numerical}>32,000 +</span>
                    <p className={css.text}>Experienced tutors</p>
                </div>
                <div className={css.wrapper}>
                    <span className={css.numerical}>300,000 +</span>
                    <p className={css.text}>5-star tutor reviews</p>
                </div>
                <div className={css.wrapper}>
                    <span className={css.numerical}>120 +</span>
                    <p className={css.text}>Subjects taught</p>
                </div>
                <div className={css.wrapper}>
                    <span className={css.numerical}>200 +</span>
                    <p className={css.text}>Tutor nationalities</p>
                </div>

            </div>
        </section>
    );
}
