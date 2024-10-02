import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (amount: number) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: { amount },
      }),
    }),

    confirmPayment: builder.mutation({
      query: ({ paymentIntentId, paymentMethodId }) => ({
        url: "/payments/confirm-payment",
        method: "POST",
        body: { paymentIntentId, paymentMethodId },
      }),
    }),

    savePaymentData: builder.mutation({
      query: (paymentData: {
        transactionId: string;
        amount: number;
        bikeId: string;
        userId: string;
        startTime: string;
        email: string;
      }) => ({
        url: "/rentals",
        method: "POST",
        body: paymentData,
      }),
    }),

    saveRemainderPayment: builder.mutation({
      query: ({
        rentalId,
        paymentData,
      }: {
        rentalId: string;
        paymentData: {
          transactionId: string;
          amount: number;
          bikeId: string;
          userId: string;
          email: string;
        };
      }) => ({
        url: `/rentals/${rentalId}/payments`,
        method: "PUT",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useSavePaymentDataMutation,
  useSaveRemainderPaymentMutation,
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
} = paymentApi;
