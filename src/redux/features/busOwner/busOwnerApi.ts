import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const BUS_OWNER_API = "/bus-owner";

const busOwnerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBusOwner: build.mutation({
      query: (BusOwnerData) => ({
        url: "/user/create-bus-owner",
        method: "POST",
        data: BusOwnerData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BUS_OWNER],
    }),
    deleteBusOwner: build.mutation({
      query: (id: string) => ({
        url: `${BUS_OWNER_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BUS_OWNER],
    }),
    updateBusOwner: build.mutation({
      query: ({ id, data }) => ({
        url: `${BUS_OWNER_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BUS_OWNER],
    }),
    getBusOwner: build.query({
      query: (query: Record<string, any>) => ({
        url: BUS_OWNER_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.BUS_OWNER],
    }),
    getBusOwnerById: build.query({
      query: (id: string) => ({
        url: `${BUS_OWNER_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.BUS_OWNER],
    }),
  }),
});

export const {
  useCreateBusOwnerMutation,
  useGetBusOwnerQuery,
  useDeleteBusOwnerMutation,
  useGetBusOwnerByIdQuery,
  useUpdateBusOwnerMutation,
} = busOwnerApi;
