import axiosBaseQuery from "@/helper/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helper/config/envConfig";
import { tagTypeList } from "@/redux/constant/tagTypes";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
