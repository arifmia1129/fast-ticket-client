import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const facultyApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFaculty: build.mutation({
      query: (data) => ({
        url: `/users/create-faculty`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.FACULTY],
    }),
    deleteFaculty: build.mutation({
      query: () => ({
        url: `/users/faculty`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.FACULTY],
    }),
    getFaculty: build.query({
      query: (query: Record<string, any>) => ({
        url: `/faculty`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          faculty: data,
          meta,
        };
      },
      providesTags: [tagTypes.FACULTY],
    }),
    getFacultyCourse: build.query({
      query: (query: Record<string, any>) => ({
        url: `/faculty/my-course`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          course: data,
          meta,
        };
      },
      providesTags: [tagTypes.FACULTY],
    }),
    getFacultyCourseStudent: build.query({
      query: (query: Record<string, any>) => ({
        url: `/faculty/my-course-student`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          student: data,
          meta,
        };
      },
      providesTags: [tagTypes.FACULTY],
    }),
    getFacultyById: build.query({
      query: (id: string) => ({
        url: `/faculty/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.FACULTY],
    }),
  }),
});

export const {
  useAddFacultyMutation,
  useGetFacultyQuery,
  useDeleteFacultyMutation,
  useGetFacultyByIdQuery,
  useGetFacultyCourseQuery,
  useGetFacultyCourseStudentQuery,
} = facultyApi;
