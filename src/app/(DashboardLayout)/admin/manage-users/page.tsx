// "use client";
// import { useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Divider,
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Tooltip,
// } from "@heroui/react";
// import { Edit, Eye, Trash } from "lucide-react";
// import { toast } from "sonner";

// import {
//   useDeleteUserMutation,
//   useGetAllUsersQuery,
// } from "@/src/redux/features/user/userApi";
// import { TUser } from "@/src/types";
// import AdminUserModal from "./components/viewUser";

// const UserManagement = () => {
//   const {
//     data: allUsers,
//     isLoading,
//     error,
//     refetch,
//   } = useGetAllUsersQuery(undefined);
//   const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteUser] = useDeleteUserMutation();

//   // Handle View
//   const handleView = (userId: string) => {
//     const user = allUsers?.data?.find((usr: TUser) => usr._id === userId);
//     if (user) {
//       setSelectedUser(user);
//       setIsModalOpen(true);
//     } else {
//       console.error("User not found");
//     }
//   };

//   const handleDelete = async (userId: string) => {
//     const toastId = toast("Processing...");

//     try {
//       const res = await deleteUser(userId);

//       if (res) {
//         refetch();
//         toast.success("User deleted successfully", {
//           id: toastId,
//           className: "text-green-500",
//         });
//       }
//     } catch (error) {
//       toast.error("Failed to delete user", {
//         id: toastId,
//         className: "text-red-500",
//       });
//       console.error("Failed to delete user:", error);
//     }
//   };

//   const handleEdit = (userId: string) => {
//     console.log(`Editing user with ID: ${userId}`);
//     // Add edit logic here
//   };

//   return (
//     <div>
//       <Card className="mb-8 min-h-[80vh]" radius="none">
//         <CardHeader className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-black/80">
//             User Management
//           </h2>
//           <p className="text-gray-500">
//             Total Users: {allUsers?.data?.length || 0}
//           </p>
//         </CardHeader>
//         <Divider />
//         <CardBody>
//           <Table aria-label="User management table" className="text-black/80">
//             <TableHeader>
//               <TableColumn>#</TableColumn>
//               <TableColumn>NAME</TableColumn>
//               <TableColumn>ROLE</TableColumn>
//               <TableColumn>EMAIL</TableColumn>
//               <TableColumn>JOINED</TableColumn>
//               <TableColumn>ACTIONS</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {allUsers?.data?.map((user: TUser, index: number) => (
//                 <TableRow key={user._id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>
//                     <User
//                       avatarProps={{
//                         src: user.profilePhoto || "/default-avatar.png",
//                       }}
//                       name={user.name}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       color={user.role === "ADMIN" ? "danger" : "primary"}
//                       variant="flat"
//                     >
//                       {user.role}
//                     </Chip>
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Tooltip content="View">
//                         <Button
//                           isIconOnly
//                           size="sm"
//                           variant="light"
//                           onPress={() => handleView(user?._id ?? "")}
//                         >
//                           <Eye size={20} />
//                         </Button>
//                       </Tooltip>
//                       <Tooltip content="Edit">
//                         <Button
//                           isIconOnly
//                           size="sm"
//                           variant="light"
//                           onPress={() => handleEdit(user?._id ?? "")}
//                         >
//                           <Edit size={20} />
//                         </Button>
//                       </Tooltip>
//                       <Tooltip content="Delete">
//                         <Button
//                           isIconOnly
//                           color="danger"
//                           size="sm"
//                           variant="light"
//                           onPress={() => handleDelete(user?._id ?? "")}
//                         >
//                           <Trash size={20} />
//                         </Button>
//                       </Tooltip>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardBody>
//       </Card>

//       {/* Modal for viewing user details */}
//       {selectedUser && (
//         <AdminUserModal
//           user={selectedUser}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;

"use client";

import { useState, useMemo, useCallback } from "react";
import { Users as UsersIcon } from "lucide-react";
import {
  useDeleteUserMutation,
  useGetUsersForAdminQuery,
} from "@/src/redux/features/user/userApi";

import UsersFilters, { UsersFiltersState } from "./components/usersFilters";
import UsersTable from "./components/usersTable";
import {
  useDeleteModal,
  DeleteConfirmModal,
} from "../../components/modal/deleteConfirmModal.tsx";
import UsersCharts from "./components/usersCharts";

const DEFAULT_FILTERS: UsersFiltersState = {
  search: "",
  roleFilter: "",
  emirateFilter: "",
};

export default function UsersPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const hasFilters = Object.values(filters).some((v) => v !== "");

  const updateFilters = useCallback(
    (key: keyof UsersFiltersState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );
  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const { data: userResponse, isLoading } = useGetUsersForAdminQuery(undefined);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { isOpen, itemToDelete, openDeleteModal, closeDeleteModal } =
    useDeleteModal();

  const allUsers = userResponse?.data || [];
  console.log(allUsers);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((u: any) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !u.name.toLowerCase().includes(q) &&
          !u.email.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.roleFilter && u.role !== filters.roleFilter) return false;
      if (filters.emirateFilter && u.emirate !== filters.emirateFilter)
        return false;
      return true;
    });
  }, [allUsers, filters]);

  const handleDelete = async () => {
    if (itemToDelete?.id) {
      try {
        await deleteUser(itemToDelete.id).unwrap();
        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <>
      <div className="px-4 pt-2 pb-36 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-steel-blue/10 dark:bg-lime-burst/10 rounded-lg">
            <UsersIcon className="size-4 text-steel-blue dark:text-lime-burst/70" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              Users
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {allUsers.length} registered users
            </p>
          </div>
        </div>

        <UsersCharts />

        <UsersFilters
          filters={filters}
          hasFilters={hasFilters}
          updateFilters={updateFilters}
          clearFilters={clearFilters}
        />

        <UsersTable
          users={filteredUsers}
          isLoading={isLoading}
          onDelete={(id, name) => openDeleteModal(id, name, "user")}
        />
      </div>

      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        entityName={itemToDelete?.name}
        entityType={itemToDelete?.type || "user"}
        isLoading={isDeleting}
      />
    </>
  );
}
