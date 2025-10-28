import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language;

    return (
        <div className={css.wrapper}>
            <button
                onClick={() => changeLanguage('en')}
                className={`${css.langBtn} ${currentLanguage === 'en' ? css.active : ''}`}
                aria-label="Switch to English"
            >
                EN
            </button>
            <span className={css.separator}>|</span>
            <button
                onClick={() => changeLanguage('ua')}
                className={`${css.langBtn} ${currentLanguage === 'ua' ? css.active : ''}`}
                aria-label="Перейти на українську"
            >
                UA
            </button>
        </div>
    );

}