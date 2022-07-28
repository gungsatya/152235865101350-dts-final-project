import { nasaApi } from "../services/nasaApi";
import { configureStore } from "@reduxjs/toolkit";
import { openNotifyAPi } from "../services/openNotifyApi";
import { whereTheISSApi } from "../services/whereTheISSAPI";
import galeryNasaReducer from "../features/galeryNasa/galeryNasaSlice";

export const store = configureStore({
  reducer: {
    [nasaApi.reducerPath]: nasaApi.reducer,
    [openNotifyAPi.reducerPath]: openNotifyAPi.reducer,
    [whereTheISSApi.reducerPath]: whereTheISSApi.reducer,
    galeryNasa: galeryNasaReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(nasaApi.middleware)
      .concat(openNotifyAPi.middleware)
      .concat(whereTheISSApi.middleware);
  },
});
