import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const COURSE_API = "/course";

const courseApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSE_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.COURSE],
    }),
    updateCourse: build.mutation({
      query: ({ data, id }) => ({
        url: `${COURSE_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.COURSE],
    }),
    deleteCourse: build.mutation({
      query: (id: string) => ({
        url: `${COURSE_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.COURSE],
    }),
    getCourseById: build.query({
      query: (id: string) => ({
        url: `${COURSE_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.COURSE],
    }),
    getCourse: build.query({
      query: (query: Record<string, any>) => ({
        url: COURSE_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          Course: data,
          meta,
        };
      },
      providesTags: [tagTypes.COURSE],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCourseQuery,
  useGetCourseByIdQuery,
} = courseApi;
