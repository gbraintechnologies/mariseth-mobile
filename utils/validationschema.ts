import * as yup from "yup";
const phoneRegExp = /^(0\d{9}|\d{9})$/;
export const signInSchema = yup.object().shape({
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Phone Number is required"),

  pin: yup
    .string()
    .required("Pin is required")
    .matches(/^\d{4}$/, "Pin must be exactly 4 digits")
    .min(4, "Pin must be 4 digits")
    .max(4, "Pin must be 4 digits"),
});

export const phoneNumberSchema = yup.object().shape({
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Phone Number is required"),
});
