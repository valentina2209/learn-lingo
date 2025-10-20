import React from "react";
import { Formik, Form, useField } from "formik";
import Select from "react-select";
import css from "./TeacherFilters.module.css"
import { customStyles } from "./selectStyles.js";

// Кастомний компонент SelectField для інтеграції з Formik та React Select
// --------------------------------------------------------
const SelectField = ({ label, name, options, ...props }) => {
    // Хук useField інтегрує компонент у Formik
    const [field, meta, helpers] = useField(name);

    // Функція для форматування опцій для React Select
    const formatOptions = (data, isPrice = false) => {
        // Додаємо опцію "All" на початок
        const allOption = { value: "", label: name === 'price' ? 'All' : 'All' };

        const formatted = data.map(item => ({
            value: item,
            // Для ціни додаємо "$"
            label: isPrice ? `${item}$` : item,
        }));

        return [allOption, ...formatted];
    };

    const formattedOptions = formatOptions(options, name === 'price');

    // Визначаємо поточне значення
    // Якщо поточне значення (field.value) порожнє (""), встановлюємо "All"
    const currentValue = formattedOptions.find(option => option.value === field.value) || formattedOptions[0];

    return (
        <label className={css.label}>
            <span className={css.labelText}>{label}</span>
            <Select
                name={field.name}
                options={formattedOptions}
                value={currentValue}
                // Оновлюємо значення Formik при зміні опції
                onChange={option => helpers.setValue(option.value)}
                onBlur={field.onBlur}
                styles={customStyles} // Використовуємо імпортовані стилі
                isSearchable={false} // Вимикаємо поле пошуку
                classNamePrefix="select"
            />
        </label>
    );
};

export default function TeacherFilters({ options, onFilter }) {
    const { languages, levels, prices } = options;

    const initialValues = {
        language: "",
        level: "",
        price: "",
    };

    const handleSubmit = (values) => {
        onFilter(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
                {/* Фільтр мов (Languages) */}
                <SelectField
                    label="Languages"
                    name="language"
                    options={languages}
                />

                {/* Фільтр рівня знань (Level of knowledge) */}
                <SelectField
                    label="Level of knowledge"
                    name="level"
                    options={levels}
                />

                {/* Фільтр ціни (Price) */}
                <SelectField
                    label="Price"
                    name="price"
                    options={prices}
                />

                <button type="submit" className={css.button}>
                    Apply filters
                </button>
            </Form>
        </Formik>
    )
}