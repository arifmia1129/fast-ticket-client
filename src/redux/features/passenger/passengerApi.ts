import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const PASSENGER_API = "/passenger";

const passengerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPassenger: build.mutation({
      query: (PassengerData) => ({
        url: PASSENGER_API,
        method: "POST",
        data: PassengerData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.PASSENGER],
    }),
    deletePassenger: build.mutation({
      query: (id: string) => ({
        url: `${PASSENGER_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.PASSENGER],
    }),
    updatePassenger: build.mutation({
      query: ({ id, data }) => ({
        url: `${PASSENGER_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.PASSENGER],
    }),
    getPassenger: build.query({
      query: (query: Record<string, any>) => ({
        url: PASSENGER_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.PASSENGER],
    }),
    getPassengerById: build.query({
      query: (id: string) => ({
        url: `${PASSENGER_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.PASSENGER],
    }),
  }),
});

export const {
  useCreatePassengerMutation,
  useGetPassengerQuery,
  useDeletePassengerMutation,
  useGetPassengerByIdQuery,
  useUpdatePassengerMutation,
} = passengerApi;
