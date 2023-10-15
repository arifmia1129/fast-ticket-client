import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const ROOM_API = "/room";

const RoomApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addRoom: build.mutation({
      query: (data) => ({
        url: ROOM_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.ROOM],
    }),
    updateRoom: build.mutation({
      query: ({ data, id }) => ({
        url: `${ROOM_API}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.ROOM],
    }),
    deleteRoom: build.mutation({
      query: (id: string) => ({
        url: `${ROOM_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ROOM],
    }),
    getRoomById: build.query({
      query: (id: string) => ({
        url: `${ROOM_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.ROOM],
    }),
    getRoom: build.query({
      query: (query: Record<string, any>) => ({
        url: ROOM_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          room: data,
          meta,
        };
      },
      providesTags: [tagTypes.ROOM],
    }),
  }),
});

export const {
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useGetRoomQuery,
  useGetRoomByIdQuery,
} = RoomApi;
