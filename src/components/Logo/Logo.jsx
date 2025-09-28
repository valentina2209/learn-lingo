import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";


const Logo = () => {
    return (
        <NavLink className={css.wrap} to={"/"}>
            <svg className={css.icon}>
                <use
                    href={`/learnLingo.svg`}
                >
                </use>
            </svg>
            <p className={css.title}>LearnLingo</p>
        </NavLink>
    )
}

export default Logo