import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUser: builder.query({
    //   query: () => "user",
    // }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: "/update-user-avatar",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name, email }) => ({
        url: "/update-user-info",
        method: "PUT",
        body: { name, email },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/update-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
