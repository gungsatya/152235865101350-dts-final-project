import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_NASA_BASE_URL = "https://api.nasa.gov";
const IMAGE_API_NASA_BASE_URL = "https://images-api.nasa.gov";

const paramsObjToString = (params) =>
  Object.keys(params)
    .map((key) => {
      if (!params[key]) return "";
      if (params[key] instanceof Array)
        return `${key}=${params[key].join(",")}`;
      else return `${key}=${params[key]}`;
    })
    .join("&");

export const nasaApi = createApi({
  reducerPath: "nasaApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getAPOD: builder.query({
      query: ({ count = 1 }) => ({
        url: `${API_NASA_BASE_URL}/planetary/apod`,
        params: new URLSearchParams({
          count: count,
          api_key: process.env.REACT_APP_NASA_API_KEY,
        }),
      }),
    }),
    getImageSearch: builder.query({
      query: ({ params }) => ({
        url: `${IMAGE_API_NASA_BASE_URL}/search?${paramsObjToString(params)}`,
      }),
    }),
    getImageAssetByID: builder.query({
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

export const { useGetAPODQuery, useGetImageSearchQuery } = nasaApi;
