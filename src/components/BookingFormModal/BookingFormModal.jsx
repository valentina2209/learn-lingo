import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import bookingValidationSchema from "./bookingValidationSchema";
import { useTranslation } from "react-i18next";

import css from "./BookingFormModal.module.css";


const modalRoot = document.getElementById("modal-root") || document.body;

const reasons = [
    { value: "career", label: "Career and business" },
    { value: "kids", label: "Lesson for kids" },
    { value: "abroad", label: "Living abroad" },
    { value: "exams", label: "Exams and coursework" },
    { value: "travel", label: "Culture, travel or hobby" },
];

export default function BookingFormModal({ teacher, onClose }) {
    const { t } = useTranslation();

    const defaultValues = {
        reason: "",
        fullName: "",
        email: "",
        phoneNumber: "",
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(bookingValidationSchema),
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);

        document.body.classList.add('modal-open');

        return () => {
            document.removeEventListener("keydown", handleKeyDown);

            document.body.classList.remove('modal-open');
        };
    }, [onClose]);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) onClose();
    };

    const onSubmit = (data) => {

        console.log("Booking Data:", data);

        toast.success("Trial lesson successfully booked!");
        reset();
        onClose();
    };

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button onClick={onClose} className={css.closeBtn}>
                    <svg className={css.icon}><use href="/icons.svg#icon-criss-cross" /></svg>
                </button>

                <div>
                    <h2 className={css.title}>{t("book.title")}</h2>
                    <p className={css.subTitle}>
                        {t("book.text")}
                    </p>
                </div>

                <div className={css.teacherInfo}>
                    <img src={teacher.avatar} alt={teacher.name} className={css.avatar} />
                    <div className={css.titleWrapper}>
                        <p className={css.infoText}>{t("book.teach")}</p>
                        <p className={css.teacherName}>{teacher.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <h3 className={css.formTitle}>{t("book.form_title")} {teacher.languages}?</h3>

                    {errors.reason && (
                        <p className={css.error}>{errors.reason.message}</p>
                    )}
                    <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                            <div className={css.radioGroup}>
                                {reasons.map((r) => (
                                    <label key={r.value} className={css.radioLabel}>
                                        <input
                                            type="radio"
                                            {...field}
                                            value={r.value}
                                            checked={field.value === r.value}
                                            className={css.radioInput}
                                        />
                                        <span className={css.customRadio}></span>
                                        {r.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    />

                    {errors.fullName && (
                        <p className={css.error}>{errors.fullName.message}</p>
                    )}
                    <input
                        type="text"
                        {...register("fullName")}
                        placeholder="Full Name"
                        className={css.input}
                    />

                    {errors.email && (
                        <p className={css.error}>{errors.email.message}</p>
                    )}

                    <input
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className={css.input}
                    />

                    {errors.phoneNumber && (
                        <p className={css.error}>{errors.phoneNumber.message}</p>
                    )}
                    <input
                        type="tel"
                        {...register("phoneNumber")}
                        placeholder="Phone number"
                        className={css.input}
                    />

                    <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
                        {t("book.sub")}
                    </button>
                </form>
            </div>
        </div>,
        modalRoot
    );
}