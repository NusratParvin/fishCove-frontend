"use client";

import { Users, MapPin, PawPrint } from "lucide-react";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useGetUserDashboardStatsQuery } from "@/src/redux/features/user/userApi";
import { formatEmirate } from "../../manage-users/components/usersUtils";

export default function UsersDashboardCard() {
  const router = useRouter();
  const { data, isLoading } = useGetUserDashboardStatsQuery(undefined);
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md shadow-sm dark:shadow-primary">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-steel-blue dark:text-lime-burst/70" />
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            Users
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/users")}
          className="text-[11px] text-steel-blue dark:text-lime-burst hover:underline"
        >
          View all →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-md p-2.5">
          <p className="text-[10px] text-zinc-400">Total users</p>
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {stats.totalUsers}
          </p>
          {stats.newThisWeek > 0 && (
            <p className="text-[10px] text-emerald-500">
              +{stats.newThisWeek} this week
            </p>
          )}
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-md p-2.5">
          <p className="text-[10px] text-zinc-400">With a pet added</p>
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {stats.percentWithPet}%
          </p>
          <p className="text-[10px] text-zinc-400">of all users</p>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-md p-2.5">
          <p className="text-[10px] text-zinc-400">Avg pets / user</p>
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {stats.avgPetsPerUser}
          </p>
          <p className="text-[10px] text-zinc-400">among owners</p>
        </div>
      </div>

      {stats.topEmirate && (
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 rounded-md px-2.5 py-2 mb-2">
          <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <MapPin className="size-3 text-steel-blue dark:text-lime-burst" />
            Top emirate
          </span>
          <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
            {formatEmirate(stats.topEmirate.emirate)} — {stats.topEmirate.count}{" "}
            users
          </span>
        </div>
      )}

      {stats.usersWithoutPet > 0 && (
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 rounded-md px-2.5 py-2">
          <PawPrint className="size-3.5 text-amber-500 flex-shrink-0" />
          <span className="text-[11px] text-amber-600 dark:text-amber-400">
            {stats.usersWithoutPet} user{stats.usersWithoutPet !== 1 ? "s" : ""}{" "}
            haven't added a pet yet
          </span>
        </div>
      )}
    </div>
  );
}
