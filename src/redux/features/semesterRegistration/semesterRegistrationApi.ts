import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const SEMESTER_REGISTRATION_API = "/semester-registration";

const semesteremesterRegistrationApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSemesterRegistration: build.mutation({
      query: (data) => ({
        url: SEMESTER_REGISTRATION_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    enrollSemesterRegistration: build.mutation({
      query: (data) => ({
        url: `${SEMESTER_REGISTRATION_API}/enroll`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    withdrewSemesterRegistration: build.mutation({
      query: (data) => ({
        url: `${SEMESTER_REGISTRATION_API}/withdrew`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    confirmSemesterRegistration: build.mutation({
      query: (data) => ({
        url: `${SEMESTER_REGISTRATION_API}/confirm`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    updateSemesterRegistration: build.mutation({
      query: ({ data, id }) => ({
        url: `${SEMESTER_REGISTRATION_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    deleteSemesterRegistration: build.mutation({
      query: (id: string) => ({
        url: `${SEMESTER_REGISTRATION_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    getSemesterRegistrationById: build.query({
      query: (id: string) => ({
        url: `${SEMESTER_REGISTRATION_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    getSemesterRegistration: build.query({
      query: (query: Record<string, any>) => ({
        url: SEMESTER_REGISTRATION_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          semesterRegistration: data,
          meta,
        };
      },
      providesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
    getStudentSemesterRegistration: build.query({
      query: (query: Record<string, any>) => ({
        url: `${SEMESTER_REGISTRATION_API}/student/my-semester-registration`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          semesterRegistration: data,
          meta,
        };
      },
      providesTags: [tagTypes.SEMESTER_REGISTRATION],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useEnrollSemesterRegistrationMutation,
  useWithdrewSemesterRegistrationMutation,
  useConfirmSemesterRegistrationMutation,
  useUpdateSemesterRegistrationMutation,
  useDeleteSemesterRegistrationMutation,
  useGetSemesterRegistrationQuery,
  useGetSemesterRegistrationByIdQuery,
  useGetStudentSemesterRegistrationQuery,
} = semesteremesterRegistrationApi;
