import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const ADMIN_API = "/admin";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteAdmin: build.mutation({
      query: (id: string) => ({
        url: `${ADMIN_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.ADMIN],
    }),
    updateAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `${ADMIN_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.ADMIN],
    }),
    getAdmin: build.query({
      query: (query: Record<string, any>) => ({
        url: ADMIN_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.ADMIN],
    }),
    getAdminById: build.query({
      query: (id: string) => ({
        url: `${ADMIN_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.ADMIN],
    }),
  }),
});

export const {
  useGetAdminQuery,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} = adminApi;
