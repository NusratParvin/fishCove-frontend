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

    getUsersForAdmin: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getSingleUserForAdmin: builder.query({
      query: (id: string) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getFriendInfo: builder.query({
      query: (id) => ({
        url: `/users/friend/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (updatedUserInfo) => ({
        url: "/users/me",
        method: "PUT",
        body: updatedUserInfo,
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

    changeRoleAdmin: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),

    followUser: builder.mutation({
      query: ({ followUserId }) => ({
        url: `/users/${followUserId}/follow`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Articles"],
    }),

    getMostFollowedAuthors: builder.query({
      query: () => "/users/most-followed",
    }),

    getUserDashboardStats: builder.query({
      query: () => "/users/stats/dashboard",
      providesTags: ["User"],
    }),

    // Domain page — everything the analytics section needs, one call
    getUserStats: builder.query({
      query: () => "/users/stats",
      providesTags: ["User"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }: { id: string; role: string }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        "User",
        { type: "User", id },
      ],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetFriendInfoQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useChangeRoleAdminMutation,
  useFollowUserMutation,
  useGetMostFollowedAuthorsQuery,
  useGetSingleUserForAdminQuery,
  useGetUserDashboardStatsQuery,
  useGetUserStatsQuery,
  useGetUsersForAdminQuery,
} = userApi;
