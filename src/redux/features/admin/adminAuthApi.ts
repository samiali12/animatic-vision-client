import { apiSlice } from "../../api/apiSlice";
import { adminLoggedIn } from "./adminAuthSlice";

export const adminAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (data: { fullName: string; email: string; password: string }) => ({
        url: "/admin/auth/register",
        method: "POST",
        body: {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        },
        credentials: "include",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // no-op
        }
      },
    }),
    loggedInAdmin: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // result.data.data contains admin payload
          dispatch(adminLoggedIn({ admin: result.data.data }));
        } catch (error) {}
      },
    }),
    logoutAdmin: builder.mutation<void, void>({
      query: () => ({
        url: "/admin/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterAdminMutation,
  useLoggedInAdminMutation,
  useLogoutAdminMutation,
} = adminAuthApi;
