import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const AUTH_API = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_API}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.USER],
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
