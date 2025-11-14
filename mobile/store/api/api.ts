import { API_BASE_URL } from "@/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    getApi: builder.query({
      query: () => "",
    }),
  }),
});

export const {} = api;
