import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const BOOKED_API = "/booked";

const bookedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooked: build.mutation({
      query: (bookedData) => ({
        url: BOOKED_API,
        method: "POST",
        data: bookedData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BOOKED, tagTypes.TRIP],
    }),
    deleteBooked: build.mutation({
      query: (id: string) => ({
        url: `${BOOKED_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BOOKED, tagTypes.TRIP],
    }),
    getBooked: build.query({
      query: (query: Record<string, any>) => ({
        url: BOOKED_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.BOOKED],
    }),
    getMyBooked: build.query({
      query: (query: Record<string, any>) => ({
        url: `${BOOKED_API}/my-booked`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.BOOKED],
    }),
  }),
});

export const {
  useCreateBookedMutation,
  useGetBookedQuery,
  useGetMyBookedQuery,
  useDeleteBookedMutation,
} = bookedApi;
