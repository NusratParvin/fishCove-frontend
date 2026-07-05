"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  useGetInsuranceProviderByIdQuery,
  useUpdateInsuranceProviderMutation,
} from "@/src/redux/features/insurance/insuranceApi";
import InsuranceForm from "../components/insuranceForm";
import InsuranceDetailsView from "../components/insuranceDetailsView";
import { Button } from "@heroui/react";
import { Pencil } from "lucide-react";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const mode = searchParams.get("mode") || "view";

  const {
    data: provider,
    isLoading: isLoadingProvider,
    isError,
  } = useGetInsuranceProviderByIdQuery(id);
  //   const provider = data?.data;
  const [updateProvider, { isLoading: isUpdating }] =
    useUpdateInsuranceProviderMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await updateProvider({ id, body: formData }).unwrap();
      toast.success("Insurance provider updated successfully!");
      router.push("/admin/insurance-providers");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update provider");
    }
  };

  const handleEditClick = () =>
    router.push(`/admin/insurance-providers/${id}?mode=edit`);
  const handleBack = () => router.push(`/admin/insurance-providers`);

  if (isLoadingProvider) {
    return (
      <div className="p-2 max-w-full mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-white/10 rounded mb-2" />
          <div className="h-4 w-32 bg-white/5 rounded mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-white/5 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !provider) {
    return (
      <div className="p-2 max-w-full mx-auto">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
          <p className="text-red-500 font-medium">Provider not found</p>
          <button
            onClick={handleBack}
            className="mt-4 text-steel-blue hover:underline"
          >
            ← Back to providers
          </button>
        </div>
      </div>
    );
  }

  const isEditMode = mode === "edit";

  return (
    <div className="p-3 sm:p-3 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-base font-bold text-steel-blue dark:text-white/90">
            {isEditMode ? "Edit Insurance Provider" : "Provider Info"}
          </h1>
          <p className="text-xs text-default-500 mt-1">
            {isEditMode
              ? `Update ${provider.name} details`
              : `Viewing ${provider.name} details`}
          </p>
        </div>

        {!isEditMode ? (
          <Button
            size="sm"
            variant="flat"
            startContent={<Pencil size={16} />}
            onPress={handleEditClick}
            className="bg-steel-blue/10 dark:bg-lime-burst/10 text-steel-blue dark:text-lime-burst hover:bg-steel-blue/20 dark:hover:bg-lime-burst/20 transition-all w-full sm:w-auto"
          >
            Edit Provider
          </Button>
        ) : (
          <Button
            variant="ghost"
            onPress={handleBack}
            className="text-steel-blue hover:text-default-700 dark:text-lime-burst dark:hover:text-default-200 transition-colors border-none hover:bg-transparent"
          >
            ← Go Back
          </Button>
        )}
      </div>

      <div className="bg-default-50 dark:bg-default-100/50 border-none shadow-lg border-divider rounded-md overflow-hidden p-4 sm:p-6 mb-24">
        {isEditMode ? (
          <InsuranceForm
            initial={provider}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
            isEdit={true}
          />
        ) : (
          <InsuranceDetailsView provider={provider} />
        )}
      </div>
    </div>
  );
}
