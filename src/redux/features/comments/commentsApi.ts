import baseApi from "../../api/baseApi";

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (commentData) => ({
        url: `/comments`,
        method: "POST",
        body: commentData,
      }),
    }),
  }),
});

export const { useAddCommentMutation } = commentsApi;
