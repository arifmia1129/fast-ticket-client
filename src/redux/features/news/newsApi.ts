import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const NEWS_API = "/news";

const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNews: build.mutation({
      query: (NewsData) => ({
        url: NEWS_API,
        method: "POST",
        data: NewsData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.NEWS],
    }),
    updateNews: build.mutation({
      query: ({ data, id }: any) => ({
        url: `${NEWS_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.NEWS],
    }),
    deleteNews: build.mutation({
      query: (id: string) => ({
        url: `${NEWS_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.NEWS],
    }),
    getNews: build.query({
      query: (query: Record<string, any>) => ({
        url: NEWS_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.NEWS],
    }),
    getNewsById: build.query({
      query: (id: string) => ({
        url: `${NEWS_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.NEWS],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useGetNewsQuery,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
  useGetNewsByIdQuery,
} = newsApi;
