"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  User,
  Pagination,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  formatEmirate,
  getEmirateColor,
  getRoleColor,
  capitalize,
} from "./usersUtils";

const columns = [
  { name: "#", uid: "serial" },
  { name: "USER", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "EMIRATE", uid: "emirate" },
  { name: "FOLLOWERS", uid: "followers" },
  { name: "JOINED", uid: "joined" },
  { name: "ACTIONS", uid: "actions" },
];

type Props = {
  users: any[];
  isLoading: boolean;
  onDelete: (id: string, name: string) => void;
};

const ROWS_PER_PAGE = 10;

export default function UsersTable({ users, isLoading, onDelete }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(users.length / ROWS_PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return users
      .slice(start, start + ROWS_PER_PAGE)
      .map((u, i) => ({ ...u, _index: start + i + 1 }));
  }, [users, page]);

  const renderCell = useCallback(
    (user: any, columnKey: string) => {
      switch (columnKey) {
        case "serial":
          return (
            <span className="text-[11px] text-default-400">{user._index}</span>
          );
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                size: "sm",
                src:
                  user.profilePhoto ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8F81&color=fff&size=32`,
              }}
              name={user.name}
              description={user.email}
              classNames={{ name: "text-[12px]", description: "text-[10px]" }}
            />
          );
        case "role":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={getRoleColor(user.role) as any}
              className="text-[10px]"
            >
              {capitalize(user.role)}
            </Chip>
          );
        case "emirate":
          return user.emirate ? (
            <Chip
              size="sm"
              variant="flat"
              color={getEmirateColor(user.emirate) as any}
              className="text-[10px]"
            >
              {formatEmirate(user.emirate)}
            </Chip>
          ) : (
            <span className="text-[11px] text-default-400">—</span>
          );
        case "followers":
          return (
            <span className="text-[12px]">{user.followers?.length || 0}</span>
          );
        case "joined":
          return (
            <span className="text-[11px] text-default-400">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </span>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EllipsisVertical className="text-default-300 size-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="view"
                    onPress={() =>
                      router.push(`/admin/manage-users/${user._id}?mode=view`)
                    }
                  >
                    View Details
                  </DropdownItem>
                  <DropdownItem
                    key="edit"
                    onPress={() =>
                      router.push(`/admin/manage-users/${user._id}?mode=edit`)
                    }
                  >
                    Change Role
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={() => onDelete(String(user._id), user.name)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return user[columnKey];
      }
    },
    [router, onDelete],
  );

  const loadingState = isLoading ? "loading" : "idle";
  const startIndex = (page - 1) * ROWS_PER_PAGE + 1;
  const endIndex = Math.min(page * ROWS_PER_PAGE, users.length);

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="text-[12px] text-default-400">
        Showing {users.length ? startIndex : 0}-{endIndex} of {users.length}{" "}
        results
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex gap-2">
        <Button
          isDisabled={page <= 1}
          size="sm"
          variant="flat"
          onPress={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Button
          isDisabled={page >= pages}
          size="sm"
          variant="flat"
          onPress={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <Table
      isHeaderSticky
      aria-label="Users table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper:
          "min-h-[400px] max-h-[800px] rounded-md overflow-y-auto custom-scrollbar",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            className="text-[11px]"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          loadingState === "loading" ? "Loading..." : "No users found"
        }
        items={pageItems}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: any) => (
          <TableRow key={String(item._id)}>
            {(columnKey) => (
              <TableCell className="py-2">
                {renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
