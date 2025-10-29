import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Logo from "../Logo/Logo";
import { useTranslation } from "react-i18next";
import css from "./Header.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Header() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const { user, logout } = useAuth();
    const isUserLoggedIn = !!user;

    const menuRef = useRef(null);
    const burgerRef = useRef(null);

    const handleCloseAuth = () => {
        setAuthModalOpen(false);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const handleOpenAuth = (mode) => {
        setAuthMode(mode);
        setAuthModalOpen(true);
    };

    const handleAuthClick = (mode) => {
        handleOpenAuth(mode);
        handleCloseMenu();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target) &&
                burgerRef.current && !burgerRef.current.contains(event.target)) {

                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <Logo />
                <nav className={`${css.nav} ${isOpen ? css.navOpen : ""}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                    >
                        {t("header.home")}
                    </NavLink>
                    <NavLink
                        to="/teachers"
                        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                    >
                        {t("header.teachers")}
                    </NavLink>
                    {isUserLoggedIn && (
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                        >
                            {t("header.favorites")}
                        </NavLink>
                    )}

                </nav>

                <div className={css.header__actions}>
                    <LanguageSwitcher />
                    {user ? (
                        <>
                            <span className={css.userName}>{t("header.hello")}, {user.displayName || user.email}</span>
                            <button className={css.btn_link} onClick={logout}>
                                <svg className={css.icon}>
                                    <use href="/icons.svg#icon-log-out"></use>
                                </svg>
                                {t("header.logout")}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={css.btn_link}
                                onClick={() => handleOpenAuth("login")}
                            >
                                <svg className={css.icon}>
                                    <use href="/icons.svg#icon-log-in"></use>
                                </svg>
                                {t("header.login")}
                            </button>

                            <button
                                className={css.btn}
                                onClick={() => handleOpenAuth("register")}
                            >
                                <span className={css.text}>
                                    {t("header.registration")}</span>
                            </button>
                        </>
                    )}

                    <button
                        className={css.burger}
                        onClick={() => setIsOpen((prev) => !prev)}
                        ref={burgerRef}
                    >
                        <svg className={css.icon}>
                            <use href={isOpen ? "/icons.svg#icon-criss-cross" : "/public/menu.svg"}></use>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className={css.mobileMenu} ref={menuRef}>
                    <nav className={css.mobileNav}>
                        <NavLink to="/" onClick={handleCloseMenu} className={css.mobileLink}>
                            {t("header.home")}
                        </NavLink>
                        <NavLink to="/teachers" onClick={handleCloseMenu} className={css.mobileLink}>
                            {t("header.teachers")}
                        </NavLink>
                        {isUserLoggedIn && (
                            <NavLink to="/favorites" onClick={handleCloseMenu} className={css.mobileLink}>
                                {t("header.favorites")}
                            </NavLink>
                        )}
                    </nav>

                    <div className={css.mobileAuth}>
                        {isUserLoggedIn ? (
                            <button className={css.mobileBtnLogout} onClick={() => { logout(); handleCloseMenu(); }}>
                                {t("header.logout")}
                            </button>
                        ) : (
                            <>
                                <button
                                    className={css.mobileBtnLink}
                                    onClick={() => handleAuthClick("login")}
                                >
                                    {t("header.login")}
                                </button>
                                <button
                                    className={css.mobileBtn}
                                    onClick={() => handleAuthClick("register")}
                                >
                                    {t("header.registration")}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {authModalOpen && authMode === "login" && (
                <LoginForm
                    onClose={handleCloseAuth}
                    onSwitchMode={() => setAuthMode("register")}
                />
            )}
            {authModalOpen && authMode === "register" && (
                <RegistrationForm
                    onClose={handleCloseAuth}
                    onSwitchMode={() => setAuthMode("login")}
                />
            )}
        </div>
    );
}
