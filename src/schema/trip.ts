import * as yup from "yup";

export const selectTripInfoSchema = yup.object().shape({
  source: yup.string().required("Source is required"),
  destination: yup.string().required("Destination is required"),
  date: yup.string().required("Date is required"),
});
