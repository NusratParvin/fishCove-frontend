"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Select, SelectItem, Chip } from "@heroui/react";
import { Pencil } from "lucide-react";
import {
  formatEmirate,
  getEmirateColor,
  capitalize,
} from "../components/usersUtils";
import {
  useGetSingleUserForAdminQuery,
  useChangeRoleAdminMutation,
} from "@/src/redux/features/user/userApi";

const ROLES = ["USER", "ADMIN"];

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const mode = searchParams.get("mode") || "view";
  const isEditMode = mode === "edit";

  const { data, isLoading, isError } = useGetSingleUserForAdminQuery(id);
  const user = data?.data;
  const [updateRole, { isLoading: isUpdating }] = useChangeRoleAdminMutation();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleBack = () => router.push("/admin/users");
  const handleEditClick = () =>
    router.push(`/admin/manage-users/${id}?mode=edit`);

  const handleSaveRole = async () => {
    if (!selectedRole) return;
    try {
      await updateRole({ userId: id, role: selectedRole }).unwrap();
      toast.success("User role updated successfully!");
      router.push("/admin/manage-users");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update role");
    }
  };

  if (isLoading) {
    return (
      <div className="p-2 max-w-full mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-white/10 rounded" />
          <div className="h-12 bg-white/5 rounded" />
          <div className="h-12 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-2 max-w-full mx-auto">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
          <p className="text-red-500 font-medium">User not found</p>
          <button
            onClick={handleBack}
            className="mt-4 text-steel-blue hover:underline"
          >
            ← Back to users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-3 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-base font-bold text-steel-blue dark:text-white/90">
            {isEditMode ? "Change User Role" : "User Info"}
          </h1>
          <p className="text-xs text-default-500 mt-1">
            {isEditMode
              ? `Update ${user.name}'s role`
              : `Viewing ${user.name}'s profile`}
          </p>
        </div>

        {!isEditMode ? (
          <Button
            size="sm"
            variant="flat"
            startContent={<Pencil size={16} />}
            onPress={handleEditClick}
            className="bg-steel-blue/10 dark:bg-lime-burst/10 text-steel-blue dark:text-lime-burst hover:bg-steel-blue/20 dark:hover:bg-lime-burst/20 transition-all w-full sm:w-auto"
          >
            Change Role
          </Button>
        ) : (
          <Button
            variant="ghost"
            onPress={handleBack}
            className="text-steel-blue hover:text-default-700 dark:text-lime-burst dark:hover:text-default-200 transition-colors border-none hover:bg-transparent"
          >
            ← Go Back
          </Button>
        )}
      </div>

      <div className="bg-default-50 dark:bg-default-100/50 border-none shadow-lg border-divider rounded-md overflow-hidden p-4 sm:p-6 mb-24">
        {isEditMode ? (
          <div className="space-y-4 max-w-sm">
            <div>
              <label className="text-xs text-default-500 uppercase tracking-wider">
                Current role
              </label>
              <p className="text-sm text-foreground mt-1 font-medium">
                {capitalize(user.role)}
              </p>
            </div>
            <Select
              label="New role"
              size="sm"
              selectedKeys={selectedRole ? [selectedRole] : []}
              onSelectionChange={(keys) =>
                setSelectedRole((Array.from(keys)[0] as string) ?? "")
              }
            >
              {ROLES.map((r) => (
                <SelectItem key={r}>{capitalize(r)}</SelectItem>
              ))}
            </Select>
            <Button
              className="bg-steel-blue text-white dark:bg-lime-burst/70"
              isDisabled={!selectedRole}
              isLoading={isUpdating}
              onPress={handleSaveRole}
            >
              Save Role
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 pb-8">
            <div className="flex items-start gap-4">
              <img
                src={
                  user.profilePhoto ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8F81&color=fff`
                }
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {user.name}
                </h2>
                <p className="text-sm text-default-500">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <Chip size="sm" variant="flat">
                    {capitalize(user.role)}
                  </Chip>
                  {user.emirate && (
                    <Chip
                      size="sm"
                      variant="flat"
                      color={getEmirateColor(user.emirate) as any}
                    >
                      {formatEmirate(user.emirate)}
                    </Chip>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.phone && (
                <div>
                  <label className="text-xs text-default-500 uppercase tracking-wider">
                    Phone
                  </label>
                  <p className="text-sm text-foreground mt-1">{user.phone}</p>
                </div>
              )}
              {user.address && (
                <div>
                  <label className="text-xs text-default-500 uppercase tracking-wider">
                    Address
                  </label>
                  <p className="text-sm text-foreground mt-1">{user.address}</p>
                </div>
              )}
              <div>
                <label className="text-xs text-default-500 uppercase tracking-wider">
                  Followers
                </label>
                <p className="text-sm text-foreground mt-1">
                  {user.followers?.length || 0}
                </p>
              </div>
              <div>
                <label className="text-xs text-default-500 uppercase tracking-wider">
                  Following
                </label>
                <p className="text-sm text-foreground mt-1">
                  {user.following?.length || 0}
                </p>
              </div>
              <div>
                <label className="text-xs text-default-500 uppercase tracking-wider">
                  Articles published
                </label>
                <p className="text-sm text-foreground mt-1">
                  {user.articles?.length || 0}
                </p>
              </div>
              <div>
                <label className="text-xs text-default-500 uppercase tracking-wider">
                  Joined
                </label>
                <p className="text-sm text-foreground mt-1">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            {user.bio && (
              <div>
                <label className="text-xs text-default-500 uppercase tracking-wider">
                  Bio
                </label>
                <p className="text-sm text-default-600 dark:text-default-400 mt-1">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
