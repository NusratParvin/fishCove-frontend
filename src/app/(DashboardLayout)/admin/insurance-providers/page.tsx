"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@heroui/react";
import { Shield, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetProvidersForAdminQuery,
  useDeleteInsuranceProviderMutation,
} from "@/src/redux/features/insurance/insuranceApi";

import InsuranceCharts from "./components/insuranceCharts";
import ReviewAiTile from "./components/reviewAiTile";

import InsuranceTable from "./components/insuranceTable";

import {
  useDeleteModal,
  DeleteConfirmModal,
} from "../../components/modal/deleteConfirmModal.tsx";
import InsuranceFilters, {
  InsuranceFiltersState,
} from "./components/insuranceFilters";

const DEFAULT_FILTERS: InsuranceFiltersState = {
  search: "",
  badgeFilter: "",
  petTypeFilter: "",
};

export default function page() {
  const router = useRouter();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const hasFilters = Object.values(filters).some((v) => v !== "");

  const updateFilters = useCallback(
    (key: keyof InsuranceFiltersState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );
  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const { data: providerResponse, isLoading } =
    useGetProvidersForAdminQuery(undefined);
  const [deleteProvider, { isLoading: isDeleting }] =
    useDeleteInsuranceProviderMutation();
  const { isOpen, itemToDelete, openDeleteModal, closeDeleteModal } =
    useDeleteModal();

  const allProviders = providerResponse?.data || [];

  const filteredProviders = useMemo(() => {
    return allProviders.filter((p: any) => {
      if (
        filters.search &&
        !p.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.badgeFilter && p.badge !== filters.badgeFilter) return false;
      if (filters.petTypeFilter && !p.pets?.includes(filters.petTypeFilter))
        return false;
      return true;
    });
  }, [allProviders, filters]);

  const handleDelete = async () => {
    if (itemToDelete?.id) {
      try {
        await deleteProvider(itemToDelete.id).unwrap();
        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete provider:", error);
      }
    }
  };

  return (
    <>
      <div className="px-4 pt-2 pb-36 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-steel-blue/10 dark:bg-lime-burst/10 rounded-lg">
              <Shield className="size-4 text-steel-blue dark:text-lime-burst/70" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Insurance Providers
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                {allProviders.length} providers registered
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-steel-blue text-white dark:bg-lime-burst/70"
            endContent={<Plus size={14} />}
            onPress={() => router.push("insurance-providers/new")}
          >
            Add New Provider
          </Button>
        </div>

        {/* <InsuranceCharts />

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <ReviewAiTile />
        </div> */}

        {/* Charts section */}
        <InsuranceCharts />

        {/* AI Review section - takes full width with side-by-side inside */}
        <ReviewAiTile />

        <InsuranceFilters
          filters={filters}
          hasFilters={hasFilters}
          updateFilters={updateFilters}
          clearFilters={clearFilters}
        />

        <InsuranceTable
          providers={filteredProviders}
          isLoading={isLoading}
          onDelete={(id, name) =>
            openDeleteModal(id, name, "insurance provider")
          }
        />
      </div>

      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        entityName={itemToDelete?.name}
        entityType={itemToDelete?.type || "insurance provider"}
        isLoading={isDeleting}
      />
    </>
  );
}
