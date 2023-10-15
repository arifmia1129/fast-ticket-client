import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const OFFERED_COURSE_API = "/offered-course";

const offeredCourseApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addOfferedCourse: build.mutation({
      query: (data) => ({
        url: OFFERED_COURSE_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.OFFERED_COURSE],
    }),
    updateOfferedCourse: build.mutation({
      query: ({ data, id }) => ({
        url: `${OFFERED_COURSE_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.OFFERED_COURSE],
    }),
    deleteOfferedCourse: build.mutation({
      query: (id: string) => ({
        url: `${OFFERED_COURSE_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.OFFERED_COURSE],
    }),
    getOfferedCourseById: build.query({
      query: (id: string) => ({
        url: `${OFFERED_COURSE_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.OFFERED_COURSE],
    }),
    getOfferedCourse: build.query({
      query: (query: Record<string, any>) => ({
        url: OFFERED_COURSE_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          offeredCourse: data,
          meta,
        };
      },
      providesTags: [tagTypes.OFFERED_COURSE],
    }),
  }),
});

export const {
  useAddOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
  useGetOfferedCourseQuery,
  useGetOfferedCourseByIdQuery,
} = offeredCourseApi;
