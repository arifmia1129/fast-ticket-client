import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const ACADEMIC_FACULTY = "/academic-faculty";

const academicFacultyApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: ACADEMIC_FACULTY,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ACADEMIC_FACULTY],
    }),
    updateAcademicFaculty: build.mutation({
      query: ({ data, id }) => ({
        url: `${ACADEMIC_FACULTY}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.ACADEMIC_FACULTY],
    }),
    deleteAcademicFaculty: build.mutation({
      query: (id: string) => ({
        url: `${ACADEMIC_FACULTY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ACADEMIC_FACULTY],
    }),
    getAcademicFacultyById: build.query({
      query: (id: string) => ({
        url: `${ACADEMIC_FACULTY}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.ACADEMIC_FACULTY],
    }),
    getAcademicFaculty: build.query({
      query: (query: Record<string, any>) => ({
        url: ACADEMIC_FACULTY,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          faculty: data,
          meta,
        };
      },
      providesTags: [tagTypes.ACADEMIC_FACULTY],
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
  useDeleteAcademicFacultyMutation,
  useGetAcademicFacultyQuery,
  useGetAcademicFacultyByIdQuery,
} = academicFacultyApi;
