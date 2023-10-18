import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const BLOG_API = "/blog";

const baseApilogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (BlogData) => ({
        url: BLOG_API,
        method: "POST",
        data: BlogData,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BLOG],
    }),
    updateBlog: build.mutation({
      query: ({ data, id }: any) => ({
        url: `${BLOG_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BLOG],
    }),
    deleteBlog: build.mutation({
      query: (id: string) => ({
        url: `${BLOG_API}/${id}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      invalidatesTags: [tagTypes.BLOG],
    }),
    getBlog: build.query({
      query: (query: Record<string, any>) => ({
        url: BLOG_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }) => {
        return { data, meta };
      },
      providesTags: [tagTypes.BLOG],
    }),
    getBlogById: build.query({
      query: (id: string) => ({
        url: `${BLOG_API}/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: [tagTypes.BLOG],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useGetBlogByIdQuery,
} = baseApilogApi;
