import baseApi from "../../api/baseApi";

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: () => "/articles",
      providesTags: ["Articles"],
    }),

    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
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
      query: ({ id, ...article }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body: article,
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
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetDashboardFeedQuery,
  useVoteArticleMutation,
} = articlesApi;
