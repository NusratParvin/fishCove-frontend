// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import { Spinner } from "@heroui/react";
// import { formatEmirate } from "./usersUtils";
// import { useGetUserStatsQuery } from "@/src/redux/features/user/userApi";

// export default function UsersCharts() {
//   const { data, isLoading } = useGetUserStatsQuery(undefined);
//   const stats = data?.data;
//   // console.log(stats);
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <Spinner size="sm" />
//       </div>
//     );
//   }

//   if (!stats) return null;

//   const emirateData = [...stats.usersByEmirate].sort(
//     (a: any, b: any) => b.count - a.count,
//   );

//   const engagementRows = [
//     {
//       label: "Added a pet",
//       percent: stats.engagement.addedPet,
//       color: "#60a5fa",
//     },
//     {
//       label: "Posted an article",
//       percent: stats.engagement.postedArticle,
//       color: "#60a5fa",
//     },
//     {
//       label: "Never engaged",
//       percent: stats.engagement.neverEngaged,
//       color: "#f87171",
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       {/* Pills */}
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 shadow-sm dark:shadow-primary">
//           <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
//             {stats.totalUsers} users
//           </span>
//         </div>
//         <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 shadow-sm dark:shadow-primary">
//           <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
//             {stats.percentWithPet}% have added a pet
//           </span>
//         </div>
//       </div>

//       {/* Growth chart */}
//       <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary">
//         <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
//           User growth
//         </p>
//         <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
//           New signups per week, last 8 weeks
//         </p>
//         {stats.userGrowth.length === 0 ? (
//           <div className="flex items-center justify-center h-[100px] text-[11px] text-zinc-400">
//             No new signups in the last 8 weeks
//           </div>
//         ) : (
//           <ResponsiveContainer width="100%" height={120}>
//             <BarChart data={stats.userGrowth}>
//               <XAxis dataKey="week" hide />
//               <Tooltip
//                 cursor={{ fill: "transparent" }}
//                 content={({ active, payload }) => {
//                   if (!active || !payload?.length) return null;
//                   const d: any = payload[0].payload;
//                   return (
//                     <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-[11px] shadow-md">
//                       <p className="text-zinc-500">{d.count} new users</p>
//                     </div>
//                   );
//                 }}
//               />
//               <Bar
//                 dataKey="count"
//                 radius={[3, 3, 0, 0]}
//                 fill="#3b82f6"
//                 maxBarSize={26}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* Engagement breakdown */}
//         <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary">
//           <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
//             Engagement breakdown
//           </p>
//           <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
//             What users have actually done
//           </p>
//           <div className="space-y-2.5">
//             {engagementRows.map((row) => (
//               <div key={row.label}>
//                 <div className="flex justify-between text-[11px] mb-1">
//                   <span className="text-zinc-600 dark:text-zinc-300">
//                     {row.label}
//                   </span>
//                   <span className="text-zinc-400">{row.percent}%</span>
//                 </div>
//                 <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full">
//                   <div
//                     className="h-1.5 rounded-full"
//                     style={{
//                       width: `${row.percent}%`,
//                       backgroundColor: row.color,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Users by emirate */}
//         <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary">
//           <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
//             Users by emirate
//           </p>
//           <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
//             Where your user base actually lives
//           </p>
//           {emirateData.length === 0 ? (
//             <div className="flex items-center justify-center h-[180px] text-[11px] text-zinc-400">
//               No emirate data yet
//             </div>
//           ) : (
//             <ResponsiveContainer width="100%" height={180}>
//               <BarChart
//                 data={emirateData}
//                 layout="vertical"
//                 margin={{ left: 8, right: 24, top: 0, bottom: 0 }}
//               >
//                 <XAxis
//                   type="number"
//                   tick={{ fontSize: 10 }}
//                   tickLine={false}
//                   axisLine={false}
//                   allowDecimals={false}
//                 />
//                 <YAxis
//                   type="category"
//                   dataKey="emirate"
//                   tick={{ fontSize: 10 }}
//                   tickLine={false}
//                   axisLine={false}
//                   tickFormatter={formatEmirate}
//                   width={80}
//                 />
//                 <Tooltip
//                   cursor={{ fill: "transparent" }}
//                   content={({ active, payload }) => {
//                     if (!active || !payload?.length) return null;
//                     const d: any = payload[0].payload;
//                     return (
//                       <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-[11px] shadow-md">
//                         <p className="font-semibold text-zinc-700 dark:text-zinc-200">
//                           {formatEmirate(d.emirate)}
//                         </p>
//                         <p className="text-zinc-500">{d.count} users</p>
//                       </div>
//                     );
//                   }}
//                 />
//                 <Bar
//                   dataKey="count"
//                   radius={[0, 4, 4, 0]}
//                   maxBarSize={16}
//                   fill="#3b82f6"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
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
import { Spinner } from "@heroui/react";
import { formatEmirate } from "./usersUtils";
import { useGetUserStatsQuery } from "@/src/redux/features/user/userApi";

export default function UsersCharts() {
  const { data, isLoading } = useGetUserStatsQuery(undefined);
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!stats) return null;

  const emirateData = [...stats.usersByEmirate].sort(
    (a: any, b: any) => b.count - a.count,
  );

  const engagementRows = [
    {
      label: "Added a pet",
      percent: stats.engagement.addedPet,
      color: "#60a5fa",
    },
    {
      label: "Posted an article",
      percent: stats.engagement.postedArticle,
      color: "#60a5fa",
    },
    {
      label: "Never engaged",
      percent: stats.engagement.neverEngaged,
      color: "#f87171",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Pills  */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 sm:px-6 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 shadow-sm dark:shadow-primary">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            {stats.totalUsers} users
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 sm:px-6 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 shadow-sm dark:shadow-primary">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            {stats.percentWithPet}% have added a pet
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Growth chart  */}
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary h-[200px] overflow-y-auto custom-scrollbar ">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 sticky top-0 bg-white dark:bg-zinc-900/60 py-1 z-10">
            User growth
          </p>
          <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
            New signups per week, last 8 weeks
          </p>
          {stats.userGrowth.length === 0 ? (
            <div className="flex items-center justify-center h-[100px] text-[11px] text-zinc-400">
              No new signups
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={stats.userGrowth}>
                <XAxis dataKey="week" hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-[11px] shadow-md">
                        <p className="text-zinc-500">{d.count} new users</p>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[3, 3, 0, 0]}
                  fill="#3b82f6"
                  maxBarSize={26}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Engagement breakdown  */}
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary h-[200px] overflow-y-auto custom-scrollbar ">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 sticky top-0 bg-white dark:bg-zinc-900/60 py-1 z-10">
            Engagement breakdown
          </p>
          <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
            What users have actually done
          </p>
          <div className="space-y-2.5">
            {engagementRows.map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {row.label}
                  </span>
                  <span className="text-zinc-400">{row.percent}%</span>
                </div>
                <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${row.percent}%`,
                      backgroundColor: row.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users by emirate   */}
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-md p-4 shadow-sm dark:shadow-primary h-[200px] overflow-y-auto custom-scrollbar ">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 sticky top-0 bg-white dark:bg-zinc-900/60 py-1 z-10">
            Users by emirate
          </p>
          <p className="text-[10px] text-zinc-400 mt-0.5 mb-3">
            Where your user base actually lives
          </p>
          {emirateData.length === 0 ? (
            <div className="flex items-center justify-center h-[100px] text-[11px] text-zinc-400">
              No emirate data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={140}>
              <BarChart
                data={emirateData}
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
                  dataKey="emirate"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatEmirate}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-[11px] shadow-md">
                        <p className="font-semibold text-zinc-700 dark:text-zinc-200">
                          {formatEmirate(d.emirate)}
                        </p>
                        <p className="text-zinc-500">{d.count} users</p>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[0, 4, 4, 0]}
                  maxBarSize={16}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
