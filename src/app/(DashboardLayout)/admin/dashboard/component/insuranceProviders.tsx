"use client";

import { Shield, Star, Bot, TriangleAlert, Check } from "lucide-react";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useGetInsuranceDashboardStatsQuery } from "@/src/redux/features/insurance/insuranceApi";

const gapColor = (count: number, total: number) => {
  const ratio = total ? count / total : 0;
  if (ratio < 0.2) return "#f87171"; // red
  if (ratio < 0.4) return "#facc15"; // yellow
  return "#60a5fa"; // blue
};

export default function InsuranceProvidersCard() {
  const router = useRouter();
  const { data, isLoading } = useGetInsuranceDashboardStatsQuery(undefined);
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
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-steel-blue dark:text-lime-burst/70" />
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            Insurance providers
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/insurance")}
          className="text-[11px] text-steel-blue dark:text-lime-burst hover:underline"
        >
          View all →
        </button>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-md p-2.5">
          <p className="text-[10px] text-zinc-400">Providers</p>
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {stats.totalProviders}
          </p>
          {stats.newThisMonth > 0 && (
            <p className="text-[10px] text-emerald-500">
              +{stats.newThisMonth} this month
            </p>
          )}
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-md p-2.5">
          <p className="text-[10px] text-zinc-400">Avg coverage</p>
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {stats.avgCoverageScore}%
          </p>
          <p className="text-[10px] text-zinc-400">score</p>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-md p-2.5">
          <p className="text-[10px] text-zinc-400">Avg rating</p>
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {stats.avgRating}
          </p>
          <p className="text-[10px] text-zinc-400">stars</p>
        </div>
      </div>

      {/* Biggest gaps */}
      <div className="mb-3">
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
          Biggest coverage gaps
        </p>
        <div className="space-y-1.5">
          {stats.biggestGaps.map((gap: any) => (
            <div key={gap.type}>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="capitalize text-zinc-600 dark:text-zinc-300">
                  {gap.type}
                </span>
                <span className="text-zinc-400">
                  {gap.count}/{gap.total} providers
                </span>
              </div>
              <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${gap.total ? (gap.count / gap.total) * 100 : 0}%`,
                    backgroundColor: gapColor(gap.count, gap.total),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top rated */}
      {stats.topRated && (
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 rounded-md px-2.5 py-2 mb-2">
          <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <Star className="size-3 text-yellow-500" />
            Top rated
          </span>
          <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
            {stats.topRated.name} — {stats.topRated.avgRating.toFixed(1)}★
          </span>
        </div>
      )}

      {/* AI recommendation spread — only shows once there's enough data */}
      {stats.aiRecommendation && (
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 rounded-md px-2.5 py-2 mb-2">
          <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <Bot className="size-3 text-steel-blue dark:text-lime-burst" />
            AI recommendation spread
          </span>
          {stats.aiRecommendation.status === "noData" && (
            <span className="text-[11px] text-zinc-400">
              No calls logged yet
            </span>
          )}
          {stats.aiRecommendation.status === "warmingUp" && (
            <span className="text-[11px] text-zinc-400">
              Not enough data yet ({stats.aiRecommendation.count}/5 calls)
            </span>
          )}
          {stats.aiRecommendation.status === "healthy" && (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
              Evenly spread across providers
            </span>
          )}
          {stats.aiRecommendation.status === "flagged" && (
            <span className="text-[11px] text-yellow-600 dark:text-yellow-400">
              {stats.aiRecommendation.percent}% point to{" "}
              {stats.aiRecommendation.topProvider}
            </span>
          )}
        </div>
      )}

      {/* Zero reviews warning */}
      {stats.zeroReviewCount > 0 ? (
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 rounded-md px-2.5 py-2">
          <TriangleAlert className="size-3.5 text-red-500 flex-shrink-0" />
          <span className="text-[11px] text-red-600 dark:text-red-400">
            {stats.zeroReviewCount} provider
            {stats.zeroReviewCount !== 1 ? "s" : ""} have zero reviews
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-md px-2.5 py-2">
          <Check className="size-3.5 text-emerald-500 flex-shrink-0" />
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
            All providers have at least one review
          </span>
        </div>
      )}
    </div>
  );
}
