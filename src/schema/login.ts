import * as yup from "yup";

export const loginSchema = yup.object().shape({
  id: yup.string().required("User ID is required"),
  password: yup.string().max(32).min(6).required("Password is required"),
});
