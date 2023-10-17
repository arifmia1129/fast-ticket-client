import * as yup from "yup";

export const adminRegistrationSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(6).max(32),
  admin: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      middleName: yup.string().optional(),
      lastName: yup.string().required("Last Name is required"),
    }),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.string(),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNo: yup
      .string()
      .required("Phone is required")
      .length(11, "Contact number must be 11 characters"),
    emergencyContactNo: yup
      .string()
      .required("Emergency contact is required")
      .length(11, "Emergency contact number must be 11 characters"),
    presentAddress: yup.string().required("Present Address is required"),
    permanentAddress: yup.string().required("Permanent Address is required"),
    bloodGroup: yup.string().required("Blood Group is required"),
    profileImage: yup.string().optional(),
    designation: yup.string().required("Designation is required"),
    permission: yup.array(),
  }),
});
