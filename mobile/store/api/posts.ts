import { PostType } from "@/types/post.type";
import { api } from "./api";

type postOrder = "asc" | "desc";

interface searchPostParams {
  limit?: number;
  authorId?: string;
  dateFrom?: string;
  dateTo?: string;
  order?: "asc" | "desc";
  type?: PostType | null;
  search?: string | null;
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
        search,
      }: searchPostParams) => {
        const params: any = { limit, order };

        if (authorId) params.authorId = authorId;
        if (dateFrom) params.dateFrom = dateFrom;
        if (dateTo) params.dateTo = dateTo;
        if (type) params.type = type;
        if (search) params.search = search;

        return {
          url: "/posts",
          params,
        };
      },

      keepUnusedDataFor: 0,
    }),

    getPostById: build.query({
      query: (postId) => `/posts/${postId}`,
    }),

    createPost: build.mutation({
      query: ({ title, description, coverImage }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        if (coverImage) {
          formData.append("coverImage", {
            uri: coverImage.uri,
            name: coverImage.fileName || "image.jpg",
            type: coverImage.type || "image/jpeg",
          } as any);
        }

        return {
          method: "POST",
          url: "/posts",
          body: formData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        };
      },
    }),

    deletePost: build.mutation({
      query: ({ postId }) => ({
        method: "DELETE",
        url: `/posts/${postId}`,
        body: { postId },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
