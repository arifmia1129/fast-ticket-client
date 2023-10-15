import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const USER_API = "/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPassenger: build.mutation({
      query: (passengerData) => ({
        url: `${USER_API}/create-passenger`,
        method: "POST",
        data: passengerData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.USER],
    }),
  }),
});

export const { useCreatePassengerMutation } = userApi;
