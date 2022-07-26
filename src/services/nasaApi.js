import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_NASA_BASE_URL = "https://api.nasa.gov";
const IMAGE_API_NASA_BASE_URL = "https://images-api.nasa.gov";

export const nasaApi = createApi({
  reducerPath: "nasaApi",
  baseQuery: fetchBaseQuery({
    paramsSerializer: (params) => {
      params.append("api_key", process.env.REACT_APP_NASA_API_KEY);
      return params;
    },
  }),
  endpoints: (builder) => ({
    getAPOD: builder.query({
      query: ({ count = 1 }) => ({
        url: `${API_NASA_BASE_URL}/planetary/apod`,
        params: new URLSearchParams({ count: count }),
      }),
    }),
    getImageSearch: builder.query({
      query: ({ q }) => ({
        url: `${IMAGE_API_NASA_BASE_URL}/search`,
        params: new URLSearchParams({ q: q }),
      }),
    }),
    getImageAsset: builder.query({
      query: ({ nasa_id }) => ({
        url: `${IMAGE_API_NASA_BASE_URL}/asset/${nasa_id}`,
      }),
    }),
    getImageMetadata: builder.query({
      query: ({ nasa_id }) => ({
        url: `${IMAGE_API_NASA_BASE_URL}/metadata/${nasa_id}`,
      }),
    }),
    getImageCaptions: builder.query({
      query: ({ nasa_id }) => ({
        url: `${IMAGE_API_NASA_BASE_URL}/captions/${nasa_id}`,
      }),
    }),
  }),
});

export const { useGetAPODQuery } = nasaApi;
