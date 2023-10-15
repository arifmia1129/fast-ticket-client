import * as yup from "yup";
export const createRoomSchema = yup.object().shape({
  roomNumber: yup.string().required("Room number is required"),
  floor: yup.string().required("Floor are required"),
  buildingId: yup.string().required("Building id is required"),
});
