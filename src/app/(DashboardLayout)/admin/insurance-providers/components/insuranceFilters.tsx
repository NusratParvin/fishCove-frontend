import { Card, CardBody, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Filter, Search, RotateCcw } from "lucide-react";
import { INSURANCE_BADGES, PET_TYPES } from "./insuranceConstants";
import { formatBadge, capitalize } from "./insuranceUtils";

export interface InsuranceFiltersState {
  search: string;
  badgeFilter: string;
  petTypeFilter: string;
}

type Props = {
  filters: InsuranceFiltersState;
  hasFilters: boolean;
  updateFilters: (key: keyof InsuranceFiltersState, value: string) => void;
  clearFilters: () => void;
};

const InsuranceFilters = ({ filters, hasFilters, updateFilters, clearFilters }: Props) => {
  const { search, badgeFilter, petTypeFilter } = filters;
  const activeCount = Object.values(filters).filter((v) => v !== "").length;

  return (
    <Card className="bg-white dark:bg-zinc-900/60 shadow-sm border border-zinc-100 dark:border-zinc-800/60 rounded-md dark:shadow-primary/40">
      <CardBody className="p-3 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <Filter className="size-3.5" />
          <span>Filters</span>
          {hasFilters && (
            <span className="px-1.5 py-0.5 rounded-full bg-steel-blue/10 dark:bg-lime-burst/10 text-[9px] font-bold text-steel-blue dark:text-lime-burst">
              {activeCount}
            </span>
          )}
          <div className="ml-auto">
            <Tooltip content="Clear all filters" placement="top">
              <button
                onClick={clearFilters}
                disabled={!hasFilters}
                className={`p-1 rounded-md transition-all ${
                  hasFilters
                    ? "text-zinc-400 hover:text-steel-blue dark:hover:text-lime-burst hover:bg-zinc-100 dark:hover:bg-zinc-800 opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <RotateCcw className="size-3.5" />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Input
            placeholder="Search provider name..."
            value={search}
            onValueChange={(v) => updateFilters("search", v)}
            size="sm"
            startContent={<Search className="size-3.5 text-zinc-400" />}
            classNames={{
              inputWrapper:
                "bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 h-7 p-1",
              input: "text-[11px]",
            }}
            className="col-span-2 sm:col-span-1"
          />

          <Select
            placeholder="Badge"
            size="sm"
            selectedKeys={badgeFilter ? [badgeFilter] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              updateFilters("badgeFilter", selected ?? "");
            }}
            classNames={{
              trigger:
                "bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 h-7",
              value: "text-[11px] text-zinc-800 dark:text-zinc-200",
              selectorIcon: "size-4",
            }}
          >
            {INSURANCE_BADGES.map((b) => (
              <SelectItem key={b} className="text-[11px]">
                {formatBadge(b)}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Pet type"
            size="sm"
            selectedKeys={petTypeFilter ? [petTypeFilter] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              updateFilters("petTypeFilter", selected ?? "");
            }}
            classNames={{
              trigger:
                "bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 h-7",
              value: "text-[11px] text-zinc-800 dark:text-zinc-200",
              selectorIcon: "size-4",
            }}
          >
            {PET_TYPES.map((p) => (
              <SelectItem key={p} className="text-[11px]">
                {capitalize(p)}
              </SelectItem>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  );
};

export default InsuranceFilters;
