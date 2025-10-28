export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: "100%",
        height: "48px",
        border: "1px solid #F3F3F3",
        borderRadius: "14px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#FFF",
        cursor: "pointer",
        padding: "0 8px",
        minHeight: "48px",
        fontSize: "16px",
    }),

    valueContainer: (provided) => ({
        ...provided,
        padding: "0",
        alignItems: "center",
    }),

    singleValue: (provided) => ({
        ...provided,
        color: "#121417",
        fontWeight: 500,
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),

    dropdownIndicator: (provided) => ({
        ...provided,
        padding: "0",
        color: "#121417",
        transition: "transform 0.2s ease-in-out",
        paddingRight: "10px",
    }),

    menu: (provided) => ({
        ...provided,
        marginTop: "8px",
        borderRadius: "14px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
    }),

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "#F4C550"
            : state.isFocused
                ? "#FBEF9A"
                : "#FFFFFF",
        color: "#070707ff",
        padding: "10px 18px",
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "16px",
    }),

    placeholder: (provided) => ({
        ...provided,
        color: "#353636ff",
    }),

    input: (provided) => ({
        ...provided,
        margin: "0",
        padding: "0",
    }),
};