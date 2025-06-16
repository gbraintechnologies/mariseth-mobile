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
    .test(
      "no-leading-zero",
      "Phone Number must not  start with 0",
      (value) => !value?.startsWith("0")
    )
    .required("Phone Number is required"),
});

export const otpverificationSchema = yup.object().shape({
  phone_number: yup.string(),
  code: yup
    .string()
    .required("Verification code is required")
    .matches(/^\d{4}$/, "verification code must be a 4-digit number"),
});

export const createPinSchema = yup.object().shape({
  pin: yup
    .string()
    .required("Pin is required")
    .matches(/^\d{4}$/, "Pin must be a 4-digit number"),
});

export const confirmPinSchema = yup.object().shape({
  phone_number: yup.string(),
  pin: yup
    .string()
    .required("Pin is required")
    .matches(/^\d{4}$/, "Pin must be a 4-digit number"),

  confirm_pin: yup
    .string()
    .required("Confirm pin is required")
    .oneOf([yup.ref("pin")], "Pins must match")
    .matches(/^\d{4}$/, "Confirm pin must be a 4-digit number"),
});

export const pinUpdateSchema = yup.object().shape({
  old_pin: yup
    .string()
    .required("Old pin is required")
    .matches(/^\d{4}$/, "Old pin must be a 4-digit number"),
  new_pin: yup
    .string()
    .required("New pin is required")
    .matches(/^\d{4}$/, "New pin must be a 4-digit number"),
});

export const resetPinSchema = yup.object().shape({
  code: yup
    .string()
    .required("Verification code is required")
    .matches(/^\d{4}$/, "verification code must be a 4-digit number"),

  pin: yup
    .string()
    .required("New pin is required")
    .matches(/^\d{4}$/, "New pin must be a 4-digit number"),

  new_pin: yup
    .string()
    .required("Confirm pin is required")
    .oneOf([yup.ref("pin")], "Pins must match")
    .matches(/^\d{4}$/, "Confirm pin must be a 4-digit number"),
});
