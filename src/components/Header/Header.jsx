import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Logo from "../Logo/Logo";

import css from "./Header.module.css";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login"); // "login" | "register"

    const { user, logout } = useAuth();

    const handleOpenAuth = (mode) => {
        setAuthMode(mode);
        setAuthModalOpen(true);
    };

    const handleCloseAuth = () => {
        setAuthModalOpen(false);
    };

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <Logo />
                <nav className={`${css.nav} ${isOpen ? css.navOpen : ""}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/teachers"
                        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                    >
                        Teachers
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                    >
                        Favorites
                    </NavLink>
                </nav>

                <div className={css.header__actions}>
                    {user ? (
                        <>
                            <span className={css.userName}>Hello, {user.displayName || user.email}</span>
                            <button className={css.btn_link} onClick={logout}>
                                <svg className={css.icon}>
                                    <use href="/icons.svg#icon-log-out"></use>
                                </svg>
                                Log out
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
                                Log in
                            </button>

                            <button
                                className={css.btn}
                                onClick={() => handleOpenAuth("register")}
                            >
                                <span className={css.text}>Registration</span>
                            </button>
                        </>
                    )}

                    <button
                        className={css.burger}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <svg className={css.icon}>
                            <use href="/icons.svg#icon-burger-menu"></use>
                        </svg>
                    </button>
                </div>
            </div>

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
