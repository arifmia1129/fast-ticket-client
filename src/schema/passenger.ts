import * as yup from "yup";

export const passengerRegistrationSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(6).max(32),
  passenger: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
    }),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date of Birth should be in the format YYYY-MM-DD"
      )
      .required("Date of Birth is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNo: yup.string().required("Phone is required"),
    emergencyContactNo: yup.string().required("Emergency contact is required"),
    presentAddress: yup.string().required("Present Address is required"),
    permanentAddress: yup.string().required("Permanent Address is required"),
    bloodGroup: yup.string().required("Blood Group is required"),
    profileImage: yup.string(),
  }),
});