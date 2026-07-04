"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InsuranceForm from "../components/insuranceForm";
import { Button } from "@heroui/react";
import { useCreateInsuranceProviderMutation } from "@/src/redux/features/insurance/insuranceApi";

export default function page() {
  const router = useRouter();
  const [createProvider, { isLoading }] = useCreateInsuranceProviderMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await createProvider(formData).unwrap();
      toast.success("Insurance provider added successfully!");
      //   router.push("/admin/insurance");
      router.push("/admin/insurance-providers");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add provider");
    }
  };

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-base font-bold text-steel-blue dark:text-white/90">
            Add Insurance Provider
          </h1>
          <p className="text-xs text-default-500 mt-1">
            Enter provider details to add to the directory
          </p>
        </div>
        <Button
          variant="ghost"
          onPress={() => router.back()}
          className="text-steel-blue hover:text-default-700 dark:text-lime-burst dark:hover:text-default-200 transition-colors border-none hover:bg-transparent"
        >
          ← Go Back
        </Button>
      </div>

      <div className="bg-default-50 dark:bg-default-100/50 border-none shadow-lg border-divider rounded-md overflow-hidden p-4 sm:p-6 mb-24">
        <InsuranceForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isEdit={false}
        />
      </div>
    </div>
  );
}
