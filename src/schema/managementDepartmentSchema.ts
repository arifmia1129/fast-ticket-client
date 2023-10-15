import * as yup from "yup";

export const manageDepartmentSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
