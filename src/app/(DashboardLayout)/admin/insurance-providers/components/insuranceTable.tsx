// "use client";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   Chip,
//   User,
//   Pagination,
//   Spinner,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
// } from "@heroui/react";
// import { EllipsisVertical } from "lucide-react";
// import { useMemo, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { formatBadge, getBadgeColor, formatPriceRange } from "./insuranceUtils";

// const columns = [
//   { name: "#", uid: "serial" },
//   { name: "PROVIDER", uid: "name" },
//   { name: "BADGE", uid: "badge" },
//   { name: "PRICE / MO", uid: "price" },
//   { name: "COVERAGE SCORE", uid: "coverageScore" },
//   { name: "RATING", uid: "rating" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type Props = {
//   providers: any[];
//   isLoading: boolean;
//   onDelete: (id: string, name: string) => void;
// };

// const ROWS_PER_PAGE = 10;

// export default function InsuranceTable({
//   providers,
//   isLoading,
//   onDelete,
// }: Props) {
//   const router = useRouter();
//   const [page, setPage] = useState(1);
//   const pages = Math.max(1, Math.ceil(providers.length / ROWS_PER_PAGE));

//   const pageItems = useMemo(() => {
//     const start = (page - 1) * ROWS_PER_PAGE;
//     return providers
//       .slice(start, start + ROWS_PER_PAGE)
//       .map((p, i) => ({ ...p, _index: start + i + 1 }));
//   }, [providers, page]);

//   const renderCell = useCallback(
//     (provider: any, columnKey: string) => {
//       switch (columnKey) {
//         case "serial":
//           return (
//             <span className="text-[11px] text-default-400">
//               {provider._index}
//             </span>
//           );
//         case "name":
//           return (
//             <User
//               avatarProps={{
//                 radius: "lg",
//                 size: "sm",
//                 src:
//                   provider.logo ||
//                   `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=0D8F81&color=fff&size=32`,
//               }}
//               name={provider.name}
//               description={provider.website}
//               classNames={{ name: "text-[12px]", description: "text-[10px]" }}
//             />
//           );
//         case "badge":
//           return provider.badge ? (
//             <Chip
//               size="sm"
//               variant="flat"
//               color={getBadgeColor(provider.badge) as any}
//               className="text-[10px]"
//             >
//               {formatBadge(provider.badge)}
//             </Chip>
//           ) : (
//             <span className="text-[11px] text-default-400">—</span>
//           );
//         case "price":
//           return (
//             <span className="text-[12px]">
//               {formatPriceRange(provider.priceFrom, provider.priceTo)}
//             </span>
//           );
//         case "coverageScore":
//           return (
//             <span className="text-[12px] font-semibold">
//               {provider.coverageScore}%
//             </span>
//           );
//         case "rating":
//           return (
//             <div className="flex items-center gap-1">
//               <span className="text-warning text-xs">★</span>
//               <span className="text-[12px] font-semibold">
//                 {provider.avgRating?.toFixed(1) || "0.0"}
//               </span>
//               <span className="text-[10px] text-default-400">
//                 ({provider.reviewCount || 0})
//               </span>
//             </div>
//           );
//         case "actions":
//           return (
//             <div className="relative flex justify-end items-center gap-2">
//               <Dropdown>
//                 <DropdownTrigger>
//                   <Button
//                     isIconOnly
//                     size="sm"
//                     variant="light"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <EllipsisVertical className="text-default-300 size-4" />
//                   </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu>
//                   <DropdownItem
//                     key="view"
//                     onPress={() =>
//                       router.push(
//                         `/admin/insurance-providers/${provider._id}?mode=view`,
//                       )
//                     }
//                   >
//                     View Details
//                   </DropdownItem>
//                   <DropdownItem
//                     key="edit"
//                     onPress={() =>
//                       router.push(
//                         `/admin/insurance-providers/${provider._id}?mode=edit`,
//                       )
//                     }
//                   >
//                     Edit Provider
//                   </DropdownItem>
//                   <DropdownItem
//                     key="delete"
//                     className="text-danger"
//                     color="danger"
//                     onPress={() =>
//                       onDelete(String(provider._id), provider.name)
//                     }
//                   >
//                     Delete
//                   </DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           );
//         default:
//           return provider[columnKey];
//       }
//     },
//     [router, onDelete],
//   );

//   const loadingState = isLoading ? "loading" : "idle";
//   const startIndex = (page - 1) * ROWS_PER_PAGE + 1;
//   const endIndex = Math.min(page * ROWS_PER_PAGE, providers.length);

//   const bottomContent = (
//     <div className="py-2 px-2 flex justify-between items-center">
//       <span className="text-[12px] text-default-400">
//         Showing {providers.length ? startIndex : 0}-{endIndex} of{" "}
//         {providers.length} results
//       </span>
//       <Pagination
//         isCompact
//         showControls
//         showShadow
//         color="primary"
//         page={page}
//         total={pages}
//         onChange={setPage}
//       />
//       <div className="hidden sm:flex gap-2">
//         <Button
//           isDisabled={page <= 1}
//           size="sm"
//           variant="flat"
//           onPress={() => setPage((p) => p - 1)}
//         >
//           Previous
//         </Button>
//         <Button
//           isDisabled={page >= pages}
//           size="sm"
//           variant="flat"
//           onPress={() => setPage((p) => p + 1)}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//        <Table
//         isHeaderSticky
//         aria-label="Insurance providers table"
//         bottomContent={bottomContent}
//         bottomContentPlacement="outside"
//         classNames={{
//           wrapper:
//             "min-h-[400px] max-h-[800px] rounded-md overflow-y-auto custom-scrollbar ",
//         }}
//       >
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={column.uid === "actions" ? "center" : "start"}
//               className="text-[11px]"
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody
//           emptyContent={
//             loadingState === "loading"
//               ? "Loading..."
//               : "No insurance providers found"
//           }
//           items={pageItems}
//           loadingContent={<Spinner />}
//           loadingState={loadingState}
//         >
//           {(item: any) => (
//             <TableRow key={String(item._id)}>
//               {(columnKey) => (
//                 <TableCell className="py-2">
//                   {renderCell(item, columnKey as string)}
//                 </TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//    );
// }

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
import { formatBadge, getBadgeColor, formatPriceRange } from "./insuranceUtils";

const columns = [
  { name: "#", uid: "serial", hideOnMobile: true },
  { name: "PROVIDER", uid: "name", hideOnMobile: false },
  { name: "BADGE", uid: "badge", hideOnMobile: true },
  { name: "PRICE / MO", uid: "price", hideOnMobile: true },
  { name: "COVERAGE SCORE", uid: "coverageScore", hideOnMobile: true },
  { name: "RATING", uid: "rating", hideOnMobile: false },
  { name: "ACTIONS", uid: "actions", hideOnMobile: false },
];

type Props = {
  providers: any[];
  isLoading: boolean;
  onDelete: (id: string, name: string) => void;
};

const ROWS_PER_PAGE = 10;

export default function InsuranceTable({
  providers,
  isLoading,
  onDelete,
}: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(providers.length / ROWS_PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return providers
      .slice(start, start + ROWS_PER_PAGE)
      .map((p, i) => ({ ...p, _index: start + i + 1 }));
  }, [providers, page]);

  const renderCell = useCallback(
    (provider: any, columnKey: string) => {
      switch (columnKey) {
        case "serial":
          return (
            <span className="text-[11px] text-default-400">
              {provider._index}
            </span>
          );
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                size: "sm",
                src:
                  provider.logo ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=0D8F81&color=fff&size=32`,
              }}
              name={provider.name}
              description={provider.website}
              classNames={{
                name: "text-[12px] truncate max-w-[100px] sm:max-w-none",
                description: "text-[10px] truncate max-w-[80px] sm:max-w-none",
              }}
            />
          );
        case "badge":
          return provider.badge ? (
            <Chip
              size="sm"
              variant="flat"
              color={getBadgeColor(provider.badge) as any}
              className="text-[10px]"
            >
              {formatBadge(provider.badge)}
            </Chip>
          ) : (
            <span className="text-[11px] text-default-400">—</span>
          );
        case "price":
          return (
            <span className="text-[12px] whitespace-nowrap">
              {formatPriceRange(provider.priceFrom, provider.priceTo)}
            </span>
          );
        case "coverageScore":
          return (
            <span className="text-[12px] font-semibold">
              {provider.coverageScore}%
            </span>
          );
        case "rating":
          return (
            <div className="flex items-center gap-1">
              <span className="text-warning text-xs">★</span>
              <span className="text-[12px] font-semibold">
                {provider.avgRating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-[10px] text-default-400 hidden sm:inline">
                ({provider.reviewCount || 0})
              </span>
            </div>
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
                      router.push(
                        `/admin/insurance-providers/${provider._id}?mode=view`,
                      )
                    }
                  >
                    View Details
                  </DropdownItem>
                  <DropdownItem
                    key="edit"
                    onPress={() =>
                      router.push(
                        `/admin/insurance-providers/${provider._id}?mode=edit`,
                      )
                    }
                  >
                    Edit Provider
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={() =>
                      onDelete(String(provider._id), provider.name)
                    }
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return provider[columnKey];
      }
    },
    [router, onDelete],
  );

  const loadingState = isLoading ? "loading" : "idle";
  const startIndex = (page - 1) * ROWS_PER_PAGE + 1;
  const endIndex = Math.min(page * ROWS_PER_PAGE, providers.length);

  // Get visible columns based on screen size
  const visibleColumns = useMemo(() => {
    return columns.filter((col) => {
      // On mobile, hide columns marked with hideOnMobile
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        return !col.hideOnMobile;
      }
      return true;
    });
  }, []);

  const bottomContent = (
    <div className="py-2 px-2 flex flex-col sm:flex-row justify-between items-center gap-3">
      <span className="text-[12px] text-default-400 text-center sm:text-left">
        Showing {providers.length ? startIndex : 0}-{endIndex} of{" "}
        {providers.length} results
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        size="sm"
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
    <div className="w-full overflow-x-auto">
      <Table
        isHeaderSticky
        aria-label="Insurance providers table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper:
            "min-h-[400px] max-h-[800px] rounded-md overflow-y-auto custom-scrollbar",
          table: "min-w-[600px] sm:min-w-full",
        }}
      >
        <TableHeader columns={visibleColumns}>
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
            loadingState === "loading"
              ? "Loading..."
              : "No insurance providers found"
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
    </div>
  );
}
