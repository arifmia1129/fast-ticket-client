import * as yup from "yup";

export const addBusSchema = yup.object().shape({
  name: yup.string().required("Bus name is required"),
});
