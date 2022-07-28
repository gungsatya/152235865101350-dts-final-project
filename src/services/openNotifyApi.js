import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const BASE_URL = "http://api.open-notify.org";

export const openNotifyAPi = createApi({
  reducerPath: "openNotifyAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCurrentISSLocation: builder.query({
      query: () => ({
        url: "/iss-now.json",
      }),
    }),
    getAstronotInISS: builder.query({
      query: () => ({
        url: "/astros.json",
      }),
    }),
  }),
});

export const { useGetCurrentISSLocationQuery, useGetAstronotInISSQuery } =
  openNotifyAPi;
