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
  }),
});

export const {
  useCreateTripMutation,
  useGetTripDestinationQuery,
  useGetTripSourceQuery,
} = tripApi;
