import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `/users/${userId}`,
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserByIdQuery } = usersApi;
