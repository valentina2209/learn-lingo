import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

export default function LoginForm({ onClose }) {
    const { loginUser } = useAuth();
    const [isPassShown, setIsPassShown] = useState(false);

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
            reset();
            onClose();
            toast.success("Login successful! Welcome back.");
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
                        Log In
                    </h2>
                    <p className={css.subTitle}>
                        Welcome back! Please enter your credentials to access your account and continue your search for an teacher.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <label className={css.label}>
                        Email
                        <input
                            type="email"
                            {...register("email")}
                            className={css.input}
                        />
                        {errors.email && (
                            <p className={css.error}>{errors.email.message}</p>
                        )}
                    </label>

                    <label className={css.label}>
                        Password
                        <div className={css.passwordWrapper}>
                            <input
                                type={isPassShown ? "text" : "password"}
                                {...register("password")}
                                className={css.input}
                            />
                            <button type="button" onClick={togglePassVisibility}>
                                {isPassShown ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        {errors.password && (
                            <p className={css.error}>{errors.password.message}</p>
                        )}
                    </label>

                    <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
                        Log In
                    </button>
                </form>




            </div>
        </div>,
        modalRoot
    )

}