import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const BASE_URL = "https://api.wheretheiss.at/v1";

export const whereTheISSApi = createApi({
  reducerPath: "openNotifyAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCurrentISSPosition: builder.query({
      query: () => ({
        url: "/satellites/25544",
      }),
    }),
  }),
});

export const { useGetCurrentISSPositionQuery } = whereTheISSApi;
