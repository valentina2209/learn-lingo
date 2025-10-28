import * as Yup from "yup";

const bookingValidationSchema = Yup.object().shape({

    reason: Yup.string().required("Please select your main reason for learning."),

    fullName: Yup.string()
        .min(2, "Full Name must be at least 2 characters.")
        .max(100, "Full Name must not exceed 100 characters.")
        .required("Full Name is required"),
    email: Yup.string()
        .email("Must be a valid email.")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^\+?\d{9,15}$/, "Phone number is not valid.")
        .required("Phone number is required"),
});

export default bookingValidationSchema;



