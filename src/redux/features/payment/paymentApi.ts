import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: ({
        amount,
        articleId,
        authorId,
      }: {
        amount: number;
        articleId: string;
        authorId: string;
      }) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: { amount, articleId, authorId },
      }),
    }),

    savePaymentData: builder.mutation({
      query: (paymentData: {
        transactionId: string;
        amount: number;
        articleId: string;
        userId: string;
        email: string;
      }) => ({
        url: "/payments/confirm-payment",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { useSavePaymentDataMutation, useCreatePaymentIntentMutation } =
  paymentApi;
