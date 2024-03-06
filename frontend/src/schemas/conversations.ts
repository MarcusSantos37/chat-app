import * as yup from "yup";

export const messageSchema = yup
  .object({
    message: yup.string().required("Username is required."),
  })
  .required();

export const searchSchema = yup
  .object({
    search: yup.string().required("Username is required."),
  })
  .required();
