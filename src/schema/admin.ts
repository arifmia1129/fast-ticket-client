import * as yup from "yup";

export const adminSchema = yup.object().shape({
  password: yup.string().max(32).min(8).required("Password is required"),
  admin: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("Frist Name is required"),
      middleName: yup.string().required("Middle Name is required"),
      lastName: yup.string().required("Last Name is required"),
    }),
    email: yup.string().email().required("Email is required"),
    contactNo: yup.string().required("Phone is required"),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    designation: yup.string().required("Designation is required"),
  }),
});
