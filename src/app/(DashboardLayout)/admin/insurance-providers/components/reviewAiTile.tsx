"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Bot } from "lucide-react";
import { Spinner } from "@heroui/react";
import { useGetInsuranceStatsQuery } from "@/src/redux/features/insurance/insuranceApi";

export default function ReviewAiTile() {
  const { data, isLoading } = useGetInsuranceStatsQuery(undefined);
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!stats) return null;

  const { reviewVelocity, aiRecommendation } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Review activity */}
      <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary h-[150px] flex flex-col">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              Review activity
            </p>
            <span className="text-[10px] text-zinc-400">
              {reviewVelocity.totalReviews} total reviews
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
            Reviews submitted per week, last 8 weeks
          </p>
        </div>
        <div className="flex-1 min-h-0">
          {reviewVelocity.weekly.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">
              No reviews in the last 8 weeks
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reviewVelocity.weekly}>
                <XAxis dataKey="week" hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-[11px] shadow-md">
                        <p className="text-zinc-500">{d.count} reviews</p>
                        <p className="text-yellow-500">★ {d.avgRating} avg</p>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[3, 3, 0, 0]}
                  fill="#3b82f6"
                  maxBarSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* AI recommendation  */}
      <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary h-[150px] flex flex-col">
        <div className="flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Bot className="size-3.5 text-steel-blue dark:text-lime-burst" />
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              AI recommendation spread
            </p>
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
            Which providers the AI recommends most often
          </p>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          {aiRecommendation.total === 0 ? (
            <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">
              No recommendations logged yet
            </div>
          ) : (
            <div className="space-y-1.5 pr-1">
              {aiRecommendation.providers.map((p: any) => (
                <div key={p.provider} className="flex items-center gap-2.5">
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-300 flex-1 truncate">
                    {p.provider}
                  </span>
                  <div className="w-28 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full flex-shrink-0">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${p.percent}%`,
                        backgroundColor:
                          p.percent >= 40 ? "#facc15" : "#60a5fa",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 w-8 text-right flex-shrink-0">
                    {p.percent}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
