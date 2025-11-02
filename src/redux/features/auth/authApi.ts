import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loggedInUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.data }));
        } catch (error) {
          //console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useLoggedInUserMutation,
  useLogoutUserMutation,
} = authApi;
