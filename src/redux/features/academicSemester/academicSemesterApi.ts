import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const ACADEMIC_SEMESTER = "/academic-semester";

const academicSemesterApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAcademicSemester: build.mutation({
      query: (data) => ({
        url: ACADEMIC_SEMESTER,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ACADEMIC_SEMESTER],
    }),
    updateAcademicSemester: build.mutation({
      query: ({ data, id }) => ({
        url: `${ACADEMIC_SEMESTER}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.ACADEMIC_SEMESTER],
    }),
    deleteAcademicSemester: build.mutation({
      query: (id: string) => ({
        url: `${ACADEMIC_SEMESTER}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ACADEMIC_SEMESTER],
    }),
    getAcademicSemesterById: build.query({
      query: (id: string) => ({
        url: `${ACADEMIC_SEMESTER}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.ACADEMIC_SEMESTER],
    }),
    getAcademicSemester: build.query({
      query: (query: Record<string, any>) => ({
        url: ACADEMIC_SEMESTER,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          semester: data,
          meta,
        };
      },
      providesTags: [tagTypes.ACADEMIC_SEMESTER],
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,
  useDeleteAcademicSemesterMutation,
  useGetAcademicSemesterQuery,
  useGetAcademicSemesterByIdQuery,
} = academicSemesterApi;
