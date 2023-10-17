import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const PERMISSION_API = "/permission";

const permissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPermission: build.mutation({
      query: (PermissionData) => ({
        url: PERMISSION_API,
        method: "POST",
        data: PermissionData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.PERMISSION],
    }),
    deletePermission: build.mutation({
      query: (id: string) => ({
        url: `${PERMISSION_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.PERMISSION],
    }),
    getPermission: build.query({
      query: (query: Record<string, any>) => ({
        url: PERMISSION_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.PERMISSION],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetPermissionQuery,
  useDeletePermissionMutation,
} = permissionApi;
