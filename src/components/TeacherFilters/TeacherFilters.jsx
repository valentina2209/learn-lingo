import React from "react";
import { Formik, Form, useField } from "formik";
import Select from "react-select";
import css from "./TeacherFilters.module.css"
import { customStyles } from "./selectStyles.js";

const SelectField = ({ label, name, options, ...props }) => {

    const [field, meta, helpers] = useField(name);
    const formatOptions = (data, isPrice = false) => {
        const allOption = { value: "", label: name === 'price' ? 'All' : 'All' };

        const formatted = data.map(item => ({
            value: item,
            label: isPrice ? `${item}$` : item,
        }));

        return [allOption, ...formatted];
    };

    const formattedOptions = formatOptions(options, name === 'price');

    const currentValue = formattedOptions.find(option => option.value === field.value) || formattedOptions[0];

    return (
        <label className={css.label}>
            <span className={css.labelText}>{label}</span>
            <Select
                name={field.name}
                options={formattedOptions}
                value={currentValue}
                onChange={option => helpers.setValue(option.value)}
                onBlur={field.onBlur}
                styles={customStyles}
                isSearchable={false}
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
                <SelectField
                    label="Languages"
                    name="language"
                    options={languages}
                />
                <SelectField
                    label="Level of knowledge"
                    name="level"
                    options={levels}
                />
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