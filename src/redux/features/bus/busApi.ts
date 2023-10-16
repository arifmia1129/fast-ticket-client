import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const BUS_API = "/bus";

const busApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBus: build.mutation({
      query: (busData) => ({
        url: BUS_API,
        method: "POST",
        data: busData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BUS],
    }),
    deleteBus: build.mutation({
      query: (id: string) => ({
        url: `${BUS_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BUS],
    }),
    getBus: build.query({
      query: (query: Record<string, any>) => ({
        url: BUS_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.BUS],
    }),
  }),
});

export const { useCreateBusMutation, useGetBusQuery, useDeleteBusMutation } =
  busApi;
