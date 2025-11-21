import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `/users/${userId}`,
    }),

    signup: build.mutation({
      query: ({ email, name, lastName, password, role }) => {
        return {
          method: "POST",
          url: "/auth/signup",
          body: {
            email,
            name,
            lastName,
            password,
            role,
          },
        };
      },
    }),

    login: build.mutation({
      query: ({ email, password }) => {
        return {
          method: "POST",
          url: "auth/login",
          body: {
            email,
            password,
          },
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserByIdQuery, useSignupMutation, useLoginMutation } =
  usersApi;
