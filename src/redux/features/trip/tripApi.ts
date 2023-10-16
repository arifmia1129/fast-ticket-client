import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const TRIP_API = "/trip";

const tripApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTrip: build.mutation({
      query: (tripData) => ({
        url: TRIP_API,
        method: "POST",
        data: tripData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.TRIP],
    }),
    deleteTrip: build.mutation({
      query: (id: string) => ({
        url: `${TRIP_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.TRIP],
    }),
    updateTrip: build.mutation({
      query: ({ id, data }) => ({
        url: `${TRIP_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.TRIP],
    }),
    getTripSource: build.query({
      query: () => ({
        url: `${TRIP_API}/source`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.TRIP],
    }),
    getTripDestination: build.query({
      query: () => ({
        url: `${TRIP_API}/destination`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.TRIP],
    }),
    getTrip: build.query({
      query: (query: Record<string, any>) => ({
        url: TRIP_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.TRIP],
    }),
    getTripById: build.query({
      query: (id: string) => ({
        url: `${TRIP_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.TRIP],
    }),
  }),
});

export const {
  useCreateTripMutation,
  useGetTripDestinationQuery,
  useGetTripSourceQuery,
  useGetTripQuery,
  useDeleteTripMutation,
  useGetTripByIdQuery,
  useUpdateTripMutation,
} = tripApi;
