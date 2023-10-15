import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const BUILDING_API = "/building";

const buildingApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBuilding: build.mutation({
      query: (data) => ({
        url: BUILDING_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.BUILDING],
    }),
    updateBuilding: build.mutation({
      query: ({ data, id }) => ({
        url: `${BUILDING_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.BUILDING],
    }),
    deleteBuilding: build.mutation({
      query: (id: string) => ({
        url: `${BUILDING_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.BUILDING],
    }),
    getBuildingById: build.query({
      query: (id: string) => ({
        url: `${BUILDING_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.BUILDING],
    }),
    getBuilding: build.query({
      query: (query: Record<string, any>) => ({
        url: BUILDING_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          building: data,
          meta,
        };
      },
      providesTags: [tagTypes.BUILDING],
    }),
  }),
});

export const {
  useAddBuildingMutation,
  useUpdateBuildingMutation,
  useDeleteBuildingMutation,
  useGetBuildingQuery,
  useGetBuildingByIdQuery,
} = buildingApi;
