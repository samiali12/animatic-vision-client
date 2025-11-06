import { apiSlice } from "../../api/apiSlice";

export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
}

export interface AdminUserListResponse {
  items: AdminUser[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminUserListQuery {
  q?: string;
  role?: "admin" | "user";
  page?: number;
  limit?: number;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
}

export interface UpdateUserRoleRequest {
  role: "admin" | "user";
}

export interface UpdatePasswordRequest {
  password: string;
}

export const adminUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query<AdminUserListResponse, AdminUserListQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.q) searchParams.append("q", params.q);
        if (params.role) searchParams.append("role", params.role);
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        return `/admin/users?${searchParams.toString()}`;
      },
      transformResponse: (response: { data: AdminUserListResponse }) => response.data,
      providesTags: ["AdminUsers"],
    }),

    getUser: builder.query<AdminUser, number>({
      query: (id) => `/admin/users/${id}`,
      transformResponse: (response: { data: AdminUser }) => response.data,
      providesTags: (result, error, id) => [{ type: "AdminUsers", id }],
    }),

    createUser: builder.mutation<AdminUser, CreateUserRequest>({
      query: (data) => ({
        url: "/admin/users",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformResponse: (response: { data: AdminUser }) => response.data,
      invalidatesTags: ["AdminUsers"],
    }),

    updateUser: builder.mutation<AdminUser, { id: number; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      transformResponse: (response: { data: AdminUser }) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminUsers", id },
        "AdminUsers",
      ],
    }),

    updateUserRole: builder.mutation<AdminUser, { id: number; role: "admin" | "user" }>({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: "PATCH",
        body: { role },
        credentials: "include",
      }),
      transformResponse: (response: { data: AdminUser }) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminUsers", id },
        "AdminUsers",
      ],
    }),

    updateUserPassword: builder.mutation<void, { id: number; password: string }>({
      query: ({ id, password }) => ({
        url: `/admin/users/${id}/password`,
        method: "PATCH",
        body: { password },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "AdminUsers", id }],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["AdminUsers"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useUpdateUserPasswordMutation,
  useDeleteUserMutation,
} = adminUsersApi;

