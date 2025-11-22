import { PostType } from "@/types/post.type";
import { api } from "./api";

type postOrder = "asc" | "desc";

interface searchPostParams {
  limit?: number;
  authorId?: string;
  dateFrom?: string;
  dateTo?: string;
  order?: "asc" | "desc";
  type?: PostType;
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
        type,
      }: searchPostParams) => {
        const params: any = { limit, order };

        if (authorId) params.authorId = authorId;
        if (dateFrom) params.dateFrom = dateFrom;
        if (dateTo) params.dateTo = dateTo;
        if (type) params.type = type;

        return {
          url: "/posts",
          params,
        };
      },
    }),

    getPostById: build.query({
      query: (postId) => `/posts/${postId}`,
    }),

    createPost: build.mutation({
      query: ({ title, description, coverImage }) => {
        return {
          method: "POST",
          url: "/posts",
          body: {
            title,
            description,
            coverImage,
          },
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } =
  postApi;
