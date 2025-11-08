import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => "test",
    }),
  }),

  overrideExisting: false,
});

export const { useExampleQuery } = usersApi;
