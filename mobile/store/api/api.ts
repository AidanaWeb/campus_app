import { API_BASE_URL } from "@/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const api = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: API_BASE_URL,

  //   prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as RootState).user.accessToken;

  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }

  //     return headers;
  //   },
  // }),

  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getApi: builder.query({
      query: () => "",
    }),
  }),
});

export const {} = api;
