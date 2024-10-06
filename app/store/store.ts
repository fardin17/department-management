import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authInfoSlice from "@/app/store/userInfo-slice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authInfo: authInfoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
