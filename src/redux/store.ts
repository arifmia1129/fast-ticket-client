import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/api/apiSlice";
import { rootReducer } from "./rootreducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
