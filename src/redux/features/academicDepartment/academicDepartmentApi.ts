import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const ACADEMIC_DEPARTMENT = "/academic-department";

const academicDepartmentApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAcademicDepartment: build.mutation({
      query: (data) => ({
        url: ACADEMIC_DEPARTMENT,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ACADEMIC_DEPARTMENT],
    }),
    updateAcademicDepartment: build.mutation({
      query: ({ data, id }) => ({
        url: `${ACADEMIC_DEPARTMENT}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.ACADEMIC_DEPARTMENT],
    }),
    deleteAcademicDepartment: build.mutation({
      query: (id: string) => ({
        url: `${ACADEMIC_DEPARTMENT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ACADEMIC_DEPARTMENT],
    }),
    getAcademicDepartmentById: build.query({
      query: (id: string) => ({
        url: `${ACADEMIC_DEPARTMENT}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.ACADEMIC_DEPARTMENT],
    }),
    getAcademicDepartment: build.query({
      query: (query: Record<string, any>) => ({
        url: ACADEMIC_DEPARTMENT,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          department: data,
          meta,
        };
      },
      providesTags: [tagTypes.ACADEMIC_DEPARTMENT],
    }),
  }),
});

export const {
  useAddAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
  useDeleteAcademicDepartmentMutation,
  useGetAcademicDepartmentQuery,
  useGetAcademicDepartmentByIdQuery,
} = academicDepartmentApi;
