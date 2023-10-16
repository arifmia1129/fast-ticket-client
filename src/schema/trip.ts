import * as yup from "yup";

export const selectTripInfoSchema = yup.object().shape({
  source: yup.string().required("Source is required"),
  destination: yup.string().required("Destination is required"),
  date: yup.string(),
});

export const addTripInfoSchema = yup.object().shape({
  bus: yup.string().required("Bus name is required"),
  busNo: yup.string().required("Bus no is required"),
  source: yup.string().required("Source is required"),
  destination: yup.string().required("Destination is required"),
  date: yup.string(),
  time: yup.string().required("Time is required"),
  price: yup.string().required("Price is required"),
  totalSeat: yup.number().required("Total seat is required"),
});
