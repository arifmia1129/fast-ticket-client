import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Your name is required"),
  city: yup.string().required("City is required"),
  contactNo: yup.string().required("Contact number is required"),
  email: yup.string().required("Email address is required"),
  message: yup.string().required("Message is required"),
});
