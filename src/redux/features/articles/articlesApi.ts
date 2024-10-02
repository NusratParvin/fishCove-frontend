import baseApi from "../../api/baseApi";

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: () => "/bikes",
      providesTags: ["Bikes"],
    }),

    getBikeById: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
    }),

    createBike: builder.mutation({
      query: (bike) => ({
        url: "/bikes",
        method: "POST",
        body: bike,
      }),
      invalidatesTags: ["Bikes"],
    }),

    updateBike: builder.mutation({
      query: ({ id, ...bike }) => ({
        url: `/bikes/${id}`,
        method: "PUT",
        body: bike,
      }),
      invalidatesTags: ["Bikes"],
    }),

    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bikes"],
    }),
  }),
});

export const {
  useGetAllBikesQuery,
  useGetBikeByIdQuery,
  useCreateBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} = articlesApi;
