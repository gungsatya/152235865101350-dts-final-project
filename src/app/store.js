import { nasaApi } from "../services/nasaApi";
import { configureStore } from "@reduxjs/toolkit";
import { openNotifyAPi } from "../services/openNotifyApi";

export const store = configureStore({
  reducer: {
    [nasaApi.reducerPath]: nasaApi.reducer,
    [openNotifyAPi.reducerPath]: openNotifyAPi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(nasaApi.middleware)
      .concat(openNotifyAPi.middleware);
  },
});
