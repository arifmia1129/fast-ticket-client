import * as yup from "yup";

export const bookedSchema = yup.object().shape({
  tripInfo: yup.string().required("Seat is required"),
});
