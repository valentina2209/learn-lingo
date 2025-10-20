import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import css from "./RegistrationForm.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const registrationValidSchema = Yup.object().shape({
    name: Yup.string()
        .max(64, "Name must not exceed 64 characters.")
        .required("Name is a required field"),
    email: Yup.string()
        .email("Must be a valid email")
        .max(128, "Email must not exceed 128 characters.")
        .required("Email is a required field"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(128, "Password must not exceed 128 characters.")
        .required("Password is required"),
});

export default function RegistrationForm({ onClose }) {
    const { registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(registrationValidSchema),
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
            await registerUser(data.email, data.password, data.name);
            reset();
            onClose();
            toast.success("Registration successful! You are now logged in.")
        } catch (error) {
            toast.error("Registration failed: " + error.message);
        }
    };

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button onClick={onClose} className={css.closeBtn}>
                    <svg className={css.icon}><use href="/icons.svg#icon-criss-cross" /></svg>
                </button>

                <div className={css.wrapperTitle}>
                    <h2 className={css.title}>Registration</h2>
                    <p className={css.subTitle}>
                        Please fill in the required fields to create your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

                    <label className={css.label}>
                        Name
                        <input
                            type="text"
                            {...register("name")}
                            className={css.input}
                        />
                        {errors.name && (
                            <p className={css.error}>{errors.name.message}</p>
                        )}
                    </label>

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
                        <input
                            type="password"
                            {...register("password")}
                            className={css.input}
                        />
                        {errors.password && (
                            <p className={css.error}>{errors.password.message}</p>
                        )}
                    </label>

                    <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
                        Sign Up
                    </button>
                </form>


            </div>
        </div>,
        modalRoot
    );
}