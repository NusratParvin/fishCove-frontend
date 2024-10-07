import baseApi from "../../api/baseApi";

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: () => ({
        url: "/articles",
        method: "GET",
      }),
      providesTags: ["Articles"],
    }),

    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
    }),

    getMyArticles: builder.query({
      query: () => ({
        url: "/articles/me",
        method: "GET",
      }),
    }),

    getFollowingArticles: builder.query({
      query: () => ({
        url: "/articles/following",
        method: "GET",
      }),
    }),

    createArticle: builder.mutation({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Articles"],
    }),

    updateArticle: builder.mutation({
      query: ({ id, updatedFields }) => ({
        url: `/articles/${id}`,
        method: "PATCH",
        body: updatedFields,
      }),
      invalidatesTags: ["Articles"],
    }),

    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),

    getDashboardFeed: builder.query({
      query: () => "/articles/dashboard-feed",
      providesTags: ["Articles", "Authors"],
    }),

    voteArticle: builder.mutation({
      query: ({ articleId, voteType }) => ({
        url: `/articles/${articleId}/vote`,
        method: "PATCH",
        body: { action: voteType },
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useGetMyArticlesQuery,
  useGetFollowingArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetDashboardFeedQuery,
  useVoteArticleMutation,
} = articlesApi;
