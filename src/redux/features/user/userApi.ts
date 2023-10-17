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
    createAdmin: build.mutation({
      query: (adminData) => ({
        url: `${USER_API}/create-admin`,
        method: "POST",
        data: adminData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.USER, tagTypes.ADMIN],
    }),
    userProfile: build.query({
      query: () => ({
        url: `${USER_API}/profile`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.USER],
    }),
  }),
});

export const {
  useCreatePassengerMutation,
  useUserProfileQuery,
  useCreateAdminMutation,
} = userApi;
