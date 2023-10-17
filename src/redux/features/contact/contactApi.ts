import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const CONTACT_API = "/contact";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (ContactData) => ({
        url: CONTACT_API,
        method: "POST",
        data: ContactData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.CONTACT],
    }),
    updateContact: build.mutation({
      query: ({ data, id }: any) => ({
        url: `${CONTACT_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.CONTACT],
    }),
    deleteContact: build.mutation({
      query: (id: string) => ({
        url: `${CONTACT_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.CONTACT],
    }),
    getContact: build.query({
      query: (query: Record<string, any>) => ({
        url: CONTACT_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.CONTACT],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactApi;
