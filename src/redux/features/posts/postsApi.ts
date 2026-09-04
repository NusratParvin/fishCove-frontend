import baseApi from "../../api/baseApi";

type TShareArg = {
  refId: string;
  refType: "Article" | "Post";
  caption?: string;
};

type TFeedArg = {
  limit: number;
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

    //   getFeed: builder.infiniteQuery({
    //     infiniteQueryOptions: {
    //       initialPageParam: 0,
    //       getNextPageParam: (lastPage, allPages, lastPageParam) =>
    //         lastPageParam + 1,
    //       getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
    //         return firstPageParam > 0 ? firstPageParam - 1 : undefined
    //       },
    //     },
    //     query({ pageParam }) {
    //       return `https://example.com/listItems?page=${pageParam}`
    //     },
    //   }),
    // }),

    getFeed: builder.infiniteQuery<any, TFeedArg, number>({
      infiniteQueryOptions: {
        // Your existing API starts at page 1
        initialPageParam: 1,

        getNextPageParam: (
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
          queryArg,
        ) => {
          // Supports either:
          //
          // { data: [...] }
          //
          // or:
          //
          // [...]

          const posts = Array.isArray(lastPage)
            ? lastPage
            : (lastPage?.data ?? []);

          // If backend returned fewer than limit,
          // we reached the final page.
          if (posts.length < queryArg.limit) {
            return undefined;
          }

          return lastPageParam + 1;
        },
      },

      query: ({ queryArg, pageParam }) => ({
        url: `/posts/feed?page=${pageParam}&limit=${queryArg.limit}`,
        method: "GET",
      }),

      providesTags: ["Feed"],
    }),

    // getFeed: builder.query<any, { page?: number; limit?: number } | void>({
    //   query: (arg) => {
    //     const page = arg?.page ?? 1;
    //     const limit = arg?.limit ?? 15;
    //     return `/posts/feed?page=${page}&limit=${limit}`;
    //   },
    //   providesTags: ["Feed"],
    // }),

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
  // useGetFeedQuery,

  useGetFeedInfiniteQuery,
  useGetUserPostsQuery,
  useReactToPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
