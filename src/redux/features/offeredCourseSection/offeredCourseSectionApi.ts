import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const OFFERED_COURSE_SECTION_API = "/offered-course-section";

const offeredCourseSectionApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addOfferedCourseSection: build.mutation({
      query: (data) => ({
        url: OFFERED_COURSE_SECTION_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.OFFERED_COURSE_SECTION],
    }),
    updateOfferedCourseSection: build.mutation({
      query: ({ data, id }) => ({
        url: `${OFFERED_COURSE_SECTION_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.OFFERED_COURSE_SECTION],
    }),
    deleteOfferedCourseSection: build.mutation({
      query: (id: string) => ({
        url: `${OFFERED_COURSE_SECTION_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.OFFERED_COURSE_SECTION],
    }),
    getOfferedCourseSectionById: build.query({
      query: (id: string) => ({
        url: `${OFFERED_COURSE_SECTION_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.OFFERED_COURSE_SECTION],
    }),
    getOfferedCourseSection: build.query({
      query: (query: Record<string, any>) => ({
        url: OFFERED_COURSE_SECTION_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          offeredCourseSection: data,
          meta,
        };
      },
      providesTags: [tagTypes.OFFERED_COURSE_SECTION],
    }),
  }),
});

export const {
  useAddOfferedCourseSectionMutation,
  useUpdateOfferedCourseSectionMutation,
  useDeleteOfferedCourseSectionMutation,
  useGetOfferedCourseSectionQuery,
  useGetOfferedCourseSectionByIdQuery,
} = offeredCourseSectionApi;
