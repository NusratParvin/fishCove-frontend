"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ShieldAlert } from "lucide-react";
import { Spinner } from "@heroui/react";
import { formatCoverageType, getGapSeverity } from "./insuranceUtils";
import { useGetInsuranceStatsQuery } from "@/src/redux/features/insurance/insuranceApi";

export default function InsuranceCharts() {
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

  const statsPill = [
    { label: `${stats.totalProviders} providers` },
    { label: `${stats.avgCoverageScore}% avg coverage score` },
    { label: `${stats.avgRating} avg rating` },
  ];

  return (
    <div className="space-y-4">
      {/* Stat pills */}
      <div className="flex items-center gap-3">
        {statsPill.map(({ label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 shadow-sm dark:shadow-primary"
          >
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Coverage gap chart  */}
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary h-[250px] flex flex-col">
          <div className="flex-shrink-0">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              Insurance coverage gaps
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
              Coverage types offered by the fewest providers
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            <div className="h-full min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.coverageDistribution}
                  layout="vertical"
                  margin={{ left: 8, right: 24, top: 0, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="type"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatCoverageType}
                    width={90}
                    interval={0}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d: any = payload[0].payload;
                      const severity = getGapSeverity(d.percent);
                      return (
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-[11px] shadow-md">
                          <p className="font-semibold text-zinc-700 dark:text-zinc-200">
                            {formatCoverageType(d.type)}
                          </p>
                          <p className="text-zinc-500">
                            {d.count} of {stats.totalProviders} providers
                          </p>
                          <p style={{ color: severity.color }}>
                            {severity.label}
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
                    {stats.coverageDistribution.map((entry: any) => (
                      <Cell
                        key={entry.type}
                        fill={getGapSeverity(entry.percent).color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quality flags  */}
        <div className="h-[250px] overflow-y-auto custom-scrollbar bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary  flex flex-col">
          <div className="flex-shrink-0">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              Providers needing cleanup
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
              Missing data that affects trust
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            {stats.qualityFlags.flaggedCount === 0 ? (
              <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">
                All providers look complete
              </div>
            ) : (
              <div className="space-y-1.5 pr-1">
                {stats.qualityFlags.flagged.map((p: any) => (
                  <div
                    key={p.id}
                    className="flex items-start gap-2.5 px-2.5 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60"
                  >
                    <ShieldAlert className="size-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {p.issues.join(" · ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
