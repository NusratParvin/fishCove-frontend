import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
        url: "/payments",
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),

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

    deletePayment: builder.mutation({
      query: (transactionId) => ({
        url: `/payments/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useSavePaymentDataMutation,
  useCreatePaymentIntentMutation,
  useDeletePaymentMutation,
} = paymentApi;
