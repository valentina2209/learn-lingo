import { useState } from "react";
import css from "./Header.module.css"
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <Logo />
                <nav className={`nav ${isOpen ? "nav--open" : ""}`}>
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
                    <button className={css.btn_link}>
                        <svg className={css.icon}>
                            <use href="/icons.svg#icon-log-in"></use>
                        </svg>
                        Log in
                    </button>
                    <button className={css.btn}>
                        <span className={css.text}>Registration</span>
                    </button>

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
        </div>
    )
}