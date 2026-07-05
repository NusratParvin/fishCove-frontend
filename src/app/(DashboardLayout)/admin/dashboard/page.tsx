"use client";

import { useMemo } from "react";
import {
  Users,
  FileText,
  DollarSign,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useRouter } from "next/navigation";
import { useGetAllUsersQuery } from "@/src/redux/features/user/userApi";
import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";
import { useGetAllPaymentsQuery } from "@/src/redux/features/payment/paymentApi";
import { useGetAllReactionForAdminQuery } from "@/src/redux/features/reactions/reactionsApi";
import {
  useGetAllCommentsForAdminQuery,
  useGetCommentStatsQuery,
} from "@/src/redux/features/comments/commentsApi";
import { useGetLostFoundStatsQuery } from "@/src/redux/features/lostFound/lostFoundApi";
import { TArticle, TComment, TTransaction } from "@/src/types";
import { formatEmirate } from "../vets/components/utils";
import { useGetVetStatsQuery } from "@/src/redux/features/vets/vetsApi";
import InsuranceDashboard from "./component/insuranceProviders";
import InsuranceProvidersCard from "./component/insuranceProviders";
import UsersDashboardCard from "./component/userDashboardCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const cardClass =
  "bg-white dark:bg-zinc-900/60 shadow-sm dark:shadow-primary rounded-md border border-zinc-100 dark:border-zinc-800/60";
const headerClass = "text-sm font-semibold text-zinc-800 dark:text-zinc-100";
const subClass = "text-[10px] text-zinc-400 mt-0.5";

export default function AdminDashboard() {
  const router = useRouter();

  const { data: allUsers } = useGetAllUsersQuery(undefined);
  const { data: allArticles } = useGetAllArticlesQuery(undefined);
  const { data: allTransactions } = useGetAllPaymentsQuery(undefined);
  const { data: allReactions } = useGetAllReactionForAdminQuery(undefined);
  const { data: allComments } = useGetAllCommentsForAdminQuery(undefined);
  const { data: commentStatsData } = useGetCommentStatsQuery(undefined);
  const { data: vetStatsData } = useGetVetStatsQuery(undefined);
  const { data: lostFoundStatsData } = useGetLostFoundStatsQuery(undefined);

  const commentStats = commentStatsData?.data;
  const vetStats = vetStatsData?.data;
  const lostFoundStats = lostFoundStatsData?.data;

  // Platform activity last 7 days
  const last7DaysData = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const data = Array(7)
      .fill(0)
      .map((_, index) => {
        const date = new Date(
          now.getTime() - (6 - index) * 24 * 60 * 60 * 1000,
        );
        return {
          day: dayNames[date.getDay()],
          date: date.toISOString().split("T")[0],
          articles: 0,
          comments: 0,
          reactions: 0,
        };
      });

    allArticles?.data?.forEach((a: TArticle) => {
      const d = new Date(a.createdAt);
      if (d >= sevenDaysAgo) {
        const i = data.findIndex(
          (x) => x.date === d.toISOString().split("T")[0],
        );
        if (i !== -1) data[i].articles++;
      }
    });
    allComments?.data?.forEach((c: TComment) => {
      const d = new Date(c.createdAt);
      if (d >= sevenDaysAgo) {
        const i = data.findIndex(
          (x) => x.date === d.toISOString().split("T")[0],
        );
        if (i !== -1) data[i].comments++;
      }
    });
    allReactions?.data?.forEach((r: any) => {
      const d = new Date(r.createdAt);
      if (d >= sevenDaysAgo) {
        const i = data.findIndex(
          (x) => x.date === d.toISOString().split("T")[0],
        );
        if (i !== -1) data[i].reactions++;
      }
    });

    return data;
  }, [allArticles, allComments, allReactions]);

  const totalAmount =
    allTransactions?.data?.reduce(
      (acc: number, t: TTransaction) => acc + t.amount,
      0,
    ) || 0;
  const revenue = totalAmount * 0.3;
  const paidArticles = allArticles?.data?.filter((a: any) => a.isPremium) || [];
  const freeArticles =
    allArticles?.data?.filter((a: any) => !a.isPremium) || [];
  const contentDistribution = [
    { name: "Paid Articles", value: paidArticles.length },
    { name: "Free Articles", value: freeArticles.length },
  ];

  const summaryCards = [
    {
      title: "Active Users",
      value: allUsers?.data?.length || 0,
      icon: Users,
      color: "text-blue-500",
      subtitle: "Total registered users",
    },
    {
      title: "Premium Articles",
      value: paidArticles.length,
      icon: FileText,
      color: "text-green-500",
      subtitle: "Paid content",
    },
    {
      title: "Monthly Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-500",
      subtitle: "Platform earnings",
    },
    {
      title: "Engagement Rate",
      value: `${(((allReactions?.data?.length || 0) / (allArticles?.data?.length || 1)) * 100).toFixed(1)}%`,
      icon: ThumbsUp,
      color: "text-yellow-500",
      subtitle: "Reactions per article",
    },
  ];

  // Vets coverage gap — merge byEmirate with lostFound byEmirate
  const coverageGapData = useMemo(() => {
    if (!vetStats?.byEmirate || !lostFoundStats?.byEmirate) return [];

    return vetStats.byEmirate
      .map((v: any) => {
        const lf = lostFoundStats.byEmirate.find(
          (l: any) => l.emirate.toLowerCase() === v.emirate.toLowerCase(), // 👈 normalize both
        );
        return {
          emirate: formatEmirate(v.emirate),
          vets: v.count,
          lostPets: lf?.count || 0,
        };
      })
      .sort((a: any, b: any) => b.lostPets - a.lostPets);
  }, [vetStats, lostFoundStats]);

  // console.log("lostFoundStats", lostFoundStats);
  // console.log("lostFoundStatsData", lostFoundStatsData?.data);
  // console.log("vetStats", vetStats);
  // console.log("coverageGapData", coverageGapData);

  // console.log(
  //   "vet emirates",
  //   vetStats.byEmirate.map((v: any) => v.emirate),
  // );
  // console.log(
  //   "lf emirates",
  //   lostFoundStats.byEmirate.map((l: any) => l.emirate),
  // );

  return (
    <div className="flex flex-col gap-4 p-4 pb-12 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div>
        <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          Admin Dashboard
        </h1>
        <p className="text-[10px] text-zinc-400">
          Platform overview and analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className={`${cardClass} p-4 flex items-center gap-3`}
          >
            <div
              className={`p-2 rounded-full ${card.color.replace("text-", "bg-").replace("500", "100")} dark:bg-zinc-800`}
            >
              <card.icon className={`size-4 ${card.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400">{card.title}</p>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                {card.value}
              </p>
              <p className="text-[9px] text-zinc-400">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Platform Activity */}
        <div className={`${cardClass} p-4`}>
          <p className={headerClass}>Platform Activity</p>
          <p className={subClass}>Last 7 days engagement</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={last7DaysData}
              margin={{ top: 16, right: 16, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line
                dataKey="articles"
                name="Articles"
                stroke="#8b5cf6"
                type="monotone"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                dataKey="comments"
                name="Comments"
                stroke="#10b981"
                type="monotone"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                dataKey="reactions"
                name="Reactions"
                stroke="#f59e0b"
                type="monotone"
                dot={false}
                strokeWidth={1.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Distribution */}
        <div className={`${cardClass} p-4`}>
          <p className={headerClass}>Content Distribution</p>
          <p className={subClass}>Paid vs free content</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={contentDistribution}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={75}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {contentDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* New widgets row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Vets Coverage Gap Widget */}
        <div className={`${cardClass} p-4`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className={headerClass}>Vet Coverage vs Lost Pets</p>
              <p className={subClass}>
                Emirates with high lost pets but low vet coverage
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/vets")}
              className="flex items-center gap-1 text-[10px] text-steel-blue dark:text-lime-burst hover:underline"
            >
              View vets <ArrowRight className="size-3" />
            </button>
          </div>
          {coverageGapData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={coverageGapData}
                layout="vertical"
                margin={{ left: 8, right: 16, top: 0, bottom: 0 }}
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
                  width={70}
                />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar
                  dataKey="lostPets"
                  name="Lost Pets"
                  fill="#f87171"
                  radius={[0, 3, 3, 0]}
                  maxBarSize={10}
                />
                <Bar
                  dataKey="vets"
                  name="Vet Clinics"
                  fill="#60a5fa"
                  radius={[0, 3, 3, 0]}
                  maxBarSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-[11px] text-zinc-400 mt-4">No data available</p>
          )}
        </div>

        {/* Community Pulse Widget */}
        <div className={`${cardClass} p-4`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className={headerClass}>Community Pulse</p>
              <p className={subClass}>
                Comment activity and sighting conversions
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/comments")}
              className="flex items-center gap-1 text-[10px] text-steel-blue dark:text-lime-burst hover:underline"
            >
              View all <ArrowRight className="size-3" />
            </button>
          </div>

          {/* Inline stat pills */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {[
              {
                label: "Total",
                value: commentStats?.total || 0,
                color:
                  "text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800",
              },
              {
                label: "Sightings",
                value: commentStats?.sightings || 0,
                color:
                  "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
              },
              {
                label: "Helpful leads",
                value: commentStats?.helpfulLeads || 0,
                color:
                  "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${color}`}
              >
                <span>{value}</span>
                <span className="opacity-70">{label}</span>
              </div>
            ))}
          </div>

          {/* Recent activity feed */}
          <div className="space-y-2">
            {commentStats?.recentActivity?.slice(0, 4).map((c) => (
              <div
                key={c._id}
                className="flex items-start gap-2.5 py-1.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
              >
                <img
                  src={
                    c.commenter.profilePhoto ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(c.commenter.name)}&size=28&background=0D8F81&color=fff`
                  }
                  className="size-6 rounded-full flex-shrink-0 mt-0.5"
                  alt={c.commenter.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-zinc-700 dark:text-zinc-300 truncate">
                    {c.commenter.name}
                    {c.isSighting && (
                      <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        sighting
                      </span>
                    )}
                    {c.isHelpfulLead && (
                      <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        helpful
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {c.content}
                  </p>
                </div>
                <span className="text-[9px] text-zinc-400 flex-shrink-0">
                  {new Date(c.createdAt).toLocaleDateString("en-AE", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* insurance */}
      <InsuranceProvidersCard />
      <UsersDashboardCard />

      {/* Recent Transactions */}
      <div className={`${cardClass} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className={headerClass}>Recent Transactions</p>
            <p className={subClass}>Latest financial activity</p>
          </div>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <th className="pb-2 text-left text-zinc-400 font-medium">ID</th>
              <th className="pb-2 text-left text-zinc-400 font-medium">
                Amount
              </th>
              <th className="pb-2 text-left text-zinc-400 font-medium">Date</th>
              <th className="pb-2 text-right text-zinc-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {(allTransactions?.data || [])
              .slice(0, 5)
              .map((t: TTransaction) => (
                <tr
                  key={t._id}
                  className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
                >
                  <td className="py-2 text-zinc-500 dark:text-zinc-400">
                    {t._id.toString().slice(-8)}
                  </td>
                  <td className="py-2 text-zinc-700 dark:text-zinc-300 font-medium">
                    ${t.amount}
                  </td>
                  <td className="py-2 text-zinc-400">
                    {new Date(t.createdAt).toLocaleDateString("en-AE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2 text-right">
                    <button className="text-[10px] text-steel-blue dark:text-lime-burst hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
