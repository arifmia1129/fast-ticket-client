import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const adminApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (data) => ({
        url: `/users/admin`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.ADMIN],
    }),
    deleteAdmin: build.mutation({
      query: () => ({
        url: `/users/admin`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ADMIN],
    }),
    getAdmin: build.query({
      query: (query: Record<string, any>) => ({
        url: `/admin`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          admin: data,
          meta,
        };
      },
      providesTags: [tagTypes.ADMIN],
    }),
    getAdminById: build.query({
      query: (id: string) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.ADMIN],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminQuery,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
} = adminApi;
