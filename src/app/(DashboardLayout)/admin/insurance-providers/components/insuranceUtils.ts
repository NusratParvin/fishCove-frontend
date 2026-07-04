export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export function formatCoverageType(type: string) {
  return type.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

export function formatBadge(badge?: string) {
  if (!badge) return "";
  return badge.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

export function getBadgeColor(badge?: string) {
  const colorMap: Record<string, string> = {
    mostPopular: "primary",
    trusted: "success",
    bestForPuppies: "secondary",
    mostFlexible: "warning",
    bestPreventive: "success",
    budgetPick: "default",
  };
  return badge ? colorMap[badge] || "default" : "default";
}

// Same red/amber/blue severity scale used across your other charts
export function getGapSeverity(percent: number) {
  if (percent < 20)
    return { label: "Limited", color: "#f87171", text: "text-red-500 dark:text-red-400", bg: "bg-red-400/10" };
  if (percent < 40)
    return { label: "Moderate", color: "#facc15", text: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-400/10" };
  if (percent < 60)
    return { label: "Fair", color: "#fb923c", text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-400/10" };
  return { label: "Well covered", color: "#10b981", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" };
}

export function formatPriceRange(from: number, to: number) {
  if (from === to) return `AED ${from}`;
  return `AED ${from} - ${to}`;
}
