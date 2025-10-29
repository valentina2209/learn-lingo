import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import css from "./LoginForm.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const loginValidSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email")
        .max(128, "Email must not exceed 128 characters.")
        .required("Email is a required field"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(128, "Password must not exceed 128 characters.")
        .required("Password is required"),
});

export default function LoginForm({ onClose, onSwitchMode }) {
    const { loginUser } = useAuth();
    const [isPassShown, setIsPassShown] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginValidSchema),
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) onClose();
    };

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);

            toast.success("Login successful! Welcome back.");

            navigate("/favorites");

            onClose();

            reset();
        } catch (error) {
            toast.error("Authentication failed: " + error.message);
        }
    };

    const togglePassVisibility = () => {
        setIsPassShown(!isPassShown);
    }

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button onClick={onClose} className={css.closeBtn}>
                    <svg className={css.icon}><use href="/icons.svg#icon-criss-cross" /></svg>
                </button>

                <div className={css.wrapperTitle}>
                    <h2 className={css.title}>
                        {t("login.log_in")}
                    </h2>
                    <p className={css.subTitle}>
                        {t("login.text")}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form} autoComplete="off">
                    <div className={css.fields}>
                        <label className={css.label}>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Email"
                                autoComplete="new-email"
                                className={css.input}
                            />
                            {errors.email && (
                                <p className={css.error}>{errors.email.message}</p>
                            )}
                        </label>

                        <label className={css.label}>
                            <div className={css.passwordWrapper}>
                                <input
                                    type={isPassShown ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    className={css.input}
                                />
                                <button className={css.passwordShow}
                                    type="button"
                                    onClick={togglePassVisibility}
                                    aria-label={isPassShown ? "Hide password" : "Show password"}
                                >
                                    {isPassShown ? (
                                        <svg className={css.iconPasswords}>
                                            <use href="/icons.svg#icon-eye" />
                                        </svg>
                                    ) : (
                                        <svg className={css.iconPassword}>
                                            <use href="/icons.svg#icon-eye-off" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className={css.error}>{errors.password.message}</p>
                            )}
                        </label>
                    </div>

                    <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
                        {t("login.log_in")}
                    </button>

                    <p className={css.switchText}>
                        {t("login.switch_text")}
                        <button
                            type="button"
                            className={css.switchBtn}
                            onClick={onSwitchMode}
                        >
                            {t("login.sign_up")}
                        </button>
                    </p>


                </form>



            </div>
        </div>,
        modalRoot
    )

}