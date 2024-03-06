import * as yup from "yup";

export const signupSchema = yup
  .object({
    fullName: yup.string().required("Full Name is required."),
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
    confirmPassword: yup
      .string()
      .required("Confirm your password.")
      .oneOf([yup.ref("password")], "Passwords must match."),
    gender: yup.string().required("Gender is required."),
  })
  .required();

export const loginSchema = yup
  .object({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
  })
  .required();
