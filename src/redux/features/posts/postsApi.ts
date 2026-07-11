import baseApi from "../../api/baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Regular post creation — no 'type' field sent, backend infers it
    createPost: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: "/posts",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    sharePost: builder.mutation({
      query: (payload: {
        refId: string;
        refType: "Article" | "Post";
        caption?: string;
      }) => ({
        url: "/posts/share",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    getFeed: builder.query({
      query: ({ page = 1, limit = 15 } = {}) =>
        `/posts/feed?page=${page}&limit=${limit}`,
      providesTags: ["Feed"],
    }),

    getUserPosts: builder.query({
      query: (userId: string) => `/posts/user/${userId}`,
      providesTags: ["UserPosts"],
    }),

    // NOTE: backend endpoint for this doesn't exist yet — depends on whether
    // you go with a direct $inc on Post.reactionSummary, or generalize the
    // Reaction collection like you did for Comments (targetType/targetId).
    // Wiring the frontend now either way; swap the url if needed.
    reactToPost: builder.mutation({
      query: ({ postId, reaction }: { postId: string; reaction: string }) => ({
        url: `/posts/${postId}/react`,
        method: "POST",
        body: { reaction },
      }),
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...body }: { id: string; caption?: string }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Feed", "UserPosts"],
    }),

    deletePost: builder.mutation({
      query: (id: string) => ({
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
