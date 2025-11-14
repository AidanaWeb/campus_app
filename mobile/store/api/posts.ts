import { api } from "./api";

type postOrder = "asc" | "desc";

interface searchPostParams {
  limit?: number;
  authorId?: string;
  dateFrom?: string;
  dateTo?: string;
  order?: "asc" | "desc";
}

const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({
        limit = 10,
        authorId,
        dateFrom,
        dateTo,
        order = "desc",
      }: searchPostParams) => {
        return {
          url: "/posts",
          params: {
            limit,
            authorId,
            dateFrom,
            dateTo,
            order,
          },
        };
      },
    }),

    getPostById: build.query({
      query: (postId) => `/posts/${postId}`,
    }),
  }),

  overrideExisting: false,
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;
