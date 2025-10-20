export const customStyles = {
    // Стилі контейнера (головного поля select)
    control: (provided, state) => ({
        ...provided,
        width: "100%",
        height: "48px",
        // Біле тло, тінь, заокруглення, прибираємо синю рамку при фокусі
        border: "1px solid #F3F3F3",
        borderRadius: "14px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#FFF",
        cursor: "pointer",
        padding: "0 8px",
        minHeight: "48px", // Забезпечуємо фіксовану висоту
        fontSize: "16px",
    }),

    // Стилі для контейнера значень (тексту)
    valueContainer: (provided) => ({
        ...provided,
        padding: "0",
        alignItems: "center",
    }),

    // Стилі обраного значення
    singleValue: (provided) => ({
        ...provided,
        color: "#121417",
        fontWeight: 500,
    }),

    // Приховуємо роздільник стрілки
    indicatorSeparator: () => ({
        display: "none",
    }),

    // Стилі стрілки вниз
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: "0",
        color: "#121417",
        transition: "transform 0.2s ease-in-out",
        paddingRight: "10px",
    }),

    // Стилі випадаючого вікна (Menu)
    menu: (provided) => ({
        ...provided,
        marginTop: "8px",
        borderRadius: "14px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)", // Тінь, як на макеті 29
        overflow: "hidden",
    }),

    // Стилі опцій (Option)
    option: (provided, state) => ({
        ...provided,
        // Фон при виборі (isSelected) та при наведенні (isFocused)
        backgroundColor: state.isSelected
            ? "#F4C550" // Жовтий, як для кнопки
            : state.isFocused
                ? "#FBEF9A" // Світло-жовтий при наведенні
                : "#FFFFFF",
        color: "#070707ff",
        padding: "10px 18px",
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "16px",
    }),

    // Стилі плейсхолдера
    placeholder: (provided) => ({
        ...provided,
        color: "#353636ff",
    }),

    // Стилі інпута (приховуємо, бо не використовуємо пошук)
    input: (provided) => ({
        ...provided,
        margin: "0",
        padding: "0",
    }),
};