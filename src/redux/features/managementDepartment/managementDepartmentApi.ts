import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const MANAGEMENT_DEPARTMENT_API = "/management-department";

const managementDepartmentApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addManagementDepartment: build.mutation({
      query: (data) => ({
        url: MANAGEMENT_DEPARTMENT_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
    updateManagementDepartment: build.mutation({
      query: ({ data, id }) => ({
        url: `${MANAGEMENT_DEPARTMENT_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
    deleteManagementDepartment: build.mutation({
      query: (id: string) => ({
        url: `${MANAGEMENT_DEPARTMENT_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
    getManagementDepartmentById: build.query({
      query: (id: string) => ({
        url: `${MANAGEMENT_DEPARTMENT_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
    getManagementDepartment: build.query({
      query: (query: Record<string, any>) => ({
        url: MANAGEMENT_DEPARTMENT_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          department: data,
          meta,
        };
      },
      providesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
  }),
});

export const {
  useAddManagementDepartmentMutation,
  useUpdateManagementDepartmentMutation,
  useDeleteManagementDepartmentMutation,
  useGetManagementDepartmentQuery,
  useGetManagementDepartmentByIdQuery,
} = managementDepartmentApi;
