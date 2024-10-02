import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ token, updatedUserInfo }) => ({
        url: "/users/me",
        method: "PUT",
        body: updatedUserInfo,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    promoteUserToAdmin: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  usePromoteUserToAdminMutation,
} = userApi;
