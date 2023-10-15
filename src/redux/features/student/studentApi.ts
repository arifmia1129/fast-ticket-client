import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const studentApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudent: build.mutation({
      query: (data) => ({
        url: `/users/create-student`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.STUDENT],
    }),
    deleteStudent: build.mutation({
      query: () => ({
        url: `/users/student`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.STUDENT],
    }),
    getStudent: build.query({
      query: (query: Record<string, any>) => ({
        url: `/student`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          student: data,
          meta,
        };
      },
      providesTags: [tagTypes.STUDENT],
    }),
    getStudentCourse: build.query({
      query: (query: Record<string, any>) => ({
        url: `/student/my-course`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          course: data,
          meta,
        };
      },
      providesTags: [tagTypes.STUDENT],
    }),
    getStudentCourseSchedule: build.query({
      query: (query: Record<string, any>) => ({
        url: `/student/my-course-scheduels`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          schedules: data,
          meta,
        };
      },
      providesTags: [tagTypes.STUDENT],
    }),

    getStudentAcademicSchedule: build.query({
      query: (query: Record<string, any>) => ({
        url: `/student/my-academic-info`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          info: data,
          meta,
        };
      },
      providesTags: [tagTypes.STUDENT],
    }),
    getStudentById: build.query({
      query: (id: string) => ({
        url: `/student/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.STUDENT],
    }),

    getAllStudentMark: build.query({
      query: () => ({
        url: `/student-mark`,
        method: "GET",
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          students: data,
          meta,
        };
      },
      providesTags: [tagTypes.STUDENT],
    }),
    updateStudentMark: build.mutation({
      query: (data) => ({
        url: `/student-mark`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.STUDENT],
    }),
    updateStudentTotalMark: build.mutation({
      query: (data) => ({
        url: `/student-mark/total-final`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.STUDENT],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentQuery,
  useDeleteStudentMutation,
  useGetStudentByIdQuery,
  useGetStudentCourseQuery,
  useGetStudentCourseScheduleQuery,
  useGetAllStudentMarkQuery,
  useUpdateStudentMarkMutation,
  useUpdateStudentTotalMarkMutation,
  useGetStudentAcademicScheduleQuery,
} = studentApi;
