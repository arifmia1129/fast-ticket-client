import { baseApi } from "./features/api/apiSlice";

export const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};
