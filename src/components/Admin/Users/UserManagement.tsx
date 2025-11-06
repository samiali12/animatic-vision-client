"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useListUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  AdminUser,
} from "@/redux/features/admin/adminUsersApi";
import UserTable from "./UserTable";
import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";
import { toast } from "react-toastify";
import { Plus, Search, Loader2, Users as UsersIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"admin" | "user" | undefined>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const { data, isLoading, isError, refetch } = useListUsersQuery({
    q: search || undefined,
    role: roleFilter,
    page,
    limit: 10,
  });

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete).unwrap();
      toast.success("User deleted successfully");
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.detail || error?.data?.message || "Failed to delete user";
      toast.error(message);
    }
  };

  const handleRoleChange = async (userId: number, currentRole: "admin" | "user") => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await updateUserRole({ id: userId, role: newRole }).unwrap();
      toast.success(`User role changed to ${newRole}`);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.detail || error?.data?.message || "Failed to update role";
      toast.error(message);
    }
  };

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UsersIcon className="w-8 h-8" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button onClick={() => setOpenCreateDialog(true)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Create User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter || ""}
          onChange={(e) => {
            setRoleFilter(
              e.target.value ? (e.target.value as "admin" | "user") : undefined
            );
            setPage(1);
          }}
          className="flex h-10 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-20">
          <p className="text-destructive">
            Failed to load users. Please try again.
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            Retry
          </Button>
        </div>
      )}

      {/* Users Table */}
      {!isLoading && !isError && data && (
        <>
          <UserTable
            users={data.items}
            onEdit={(user) => setEditingUser(user)}
            onDelete={(userId) => {
              setUserToDelete(userId);
              setDeleteConfirmOpen(true);
            }}
            onRoleChange={handleRoleChange}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((page - 1) * data.limit) + 1} to{" "}
                {Math.min(page * data.limit, data.total)} of {data.total} users
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !isError && data && data.items.length === 0 && (
        <div className="text-center py-20">
          <UsersIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No users found</h3>
          <p className="text-muted-foreground mb-6">
            {search || roleFilter
              ? "Try adjusting your search or filters"
              : "Get started by creating your first user"}
          </p>
          {!search && !roleFilter && (
            <Button onClick={() => setOpenCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          )}
        </div>
      )}

      {/* Dialogs */}
      <CreateUserDialog
        open={openCreateDialog}
        onOpenChange={(open) => {
          setOpenCreateDialog(open);
          if (!open) refetch();
        }}
      />

      {editingUser && (
        <EditUserDialog
          open={!!editingUser}
          onOpenChange={(open) => {
            if (!open) {
              setEditingUser(null);
              refetch();
            }
          }}
          user={editingUser}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteConfirmOpen(false);
                setUserToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

