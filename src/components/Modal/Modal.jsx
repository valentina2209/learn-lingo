import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";


export default function Modal({ children, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className={css.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={css.modal}>
                <button aria-label="Close" className={css.closeBtn} onClick={onClose}>
                    <svg className={css.icon}>
                        <use href="/icons.svg#icon-criss-cross" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}