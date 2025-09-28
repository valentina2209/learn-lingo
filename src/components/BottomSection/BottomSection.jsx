import css from './BottomSection.module.css';

export default function BottomSection() {
    return (
        <section className={css.bottom}>
            <div className="container">
                <h2 className={css.title}>Stay Connected</h2>
                <p className={css.text}>
                    Join our community and never miss an update.
                </p>
                <button className={css.btn}>Subscribe</button>
            </div>
        </section>
    );
}
