import baseApi from "../../api/baseApi";

type TShareArg = {
  refId: string;
  refType: "Article" | "Post";
  caption?: string;
};

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<any, any>({
      query: (payload) => {
        // console.log(payload);
        return {
          url: "/posts",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    sharePost: builder.mutation<any, TShareArg>({
      query: (payload) => ({
        url: "/posts/share",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    getFeed: builder.query<any, { page?: number; limit?: number } | void>({
      query: (arg) => {
        const page = arg?.page ?? 1;
        const limit = arg?.limit ?? 15;
        return `/posts/feed?page=${page}&limit=${limit}`;
      },
      providesTags: ["Feed"],
    }),

    getUserPosts: builder.query<any, string>({
      query: (userId) => `/posts/user/${userId}`,
      providesTags: ["UserPosts"],
    }),

    reactToPost: builder.mutation<
      any,
      { postId: string; reactionType: string }
    >({
      query: ({ postId, reactionType }) => ({
        url: `/posts/${postId}/react`,
        method: "POST",
        body: { reactionType },
      }),
    }),

    updatePost: builder.mutation<any, { id: string; caption?: string }>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    deletePost: builder.mutation<any, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feed", "UserPosts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useSharePostMutation,
  useGetFeedQuery,
  useGetUserPostsQuery,
  useReactToPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
