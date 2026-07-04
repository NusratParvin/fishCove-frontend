"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, X } from "lucide-react";
import {
  INSURANCE_BADGES,
  COVERAGE_TYPES,
  PET_TYPES,
} from "./insuranceConstants";
import { formatBadge, formatCoverageType } from "./insuranceUtils";
import { CloudinaryUpload } from "@/src/components/home/cloudinaryUpload ";
import { useRouter } from "next/navigation";

export type InsuranceFormValues = {
  name: string;
  logo: string;
  badge: string;
  priceFrom: number;
  priceTo: number;
  annualLimit: number;
  reimbursement: number;
  claimsIn: string;
  coverageScore: number;
  maxAgeYears: number;
  minAgeWeeks: number;
  pets: string[];
  plans: string[];
  coverageFlags: string[];
  coveredConditions: string[];
  excludedConditions: string[];
  highlights: string[];
  website: string;
  phone: string;
  email: string;
  about: string;
};

const DEFAULT_FORM: InsuranceFormValues = {
  name: "",
  logo: "",
  badge: "",
  priceFrom: 0,
  priceTo: 0,
  annualLimit: 0,
  reimbursement: 0,
  claimsIn: "",
  coverageScore: 0,
  maxAgeYears: 0,
  minAgeWeeks: 0,
  pets: [],
  plans: [],
  coverageFlags: [],
  coveredConditions: [],
  excludedConditions: [],
  highlights: [],
  website: "",
  phone: "",
  email: "",
  about: "",
};

// array input
function SimpleArrayInput({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
  error?: string;
}) {
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;
    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
          {label}
        </label>
        {error && <span className="text-rose-500 text-[10px]">{error}</span>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          className="flex-1 px-3 py-1.5 text-[11px] border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-steel-blue dark:focus:ring-lime-burst"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-3 py-1.5 bg-steel-blue/10 dark:bg-lime-burst/10 rounded-md hover:bg-steel-blue/20 dark:hover:bg-lime-burst/20 transition-colors"
        >
          <Plus size={14} className="text-steel-blue dark:text-lime-burst" />
        </button>
      </div>
      <div className="min-h-[32px] flex flex-wrap gap-1.5 mt-1.5">
        {value.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] px-2.5 py-0.5 rounded-full"
          >
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="hover:text-red-500 transition-colors"
            >
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

type Props = {
  initial?: Partial<InsuranceFormValues>;
  onSubmit: (data: InsuranceFormValues) => void;
  isLoading: boolean;
  isEdit: boolean;
};

export default function InsuranceForm({
  initial,
  onSubmit,
  isLoading,
  isEdit,
}: Props) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InsuranceFormValues>({
    defaultValues: { ...DEFAULT_FORM, ...initial },
  });

  const inputClass =
    "w-full px-3 py-1.5 rounded-md text-[11px] bg-steel-blue/5 dark:bg-white/5 border border-steel-blue/15 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-steel-blue/50 text-gray-900 dark:text-white/90 placeholder-gray-400 dark:placeholder-white/30";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Basic info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Provider Name */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Provider Name *
            </label>
            {errors.name && (
              <span className="text-rose-500 text-[10px]">
                {errors.name.message}
              </span>
            )}
          </div>
          <input
            type="text"
            className={inputClass}
            placeholder="Enter provider name"
            {...register("name", { required: "Provider name is required" })}
          />
        </div>

        {/* Badge */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Badge *
            </label>
            {errors.badge && (
              <span className="text-rose-500 text-[10px]">
                {errors.badge.message}
              </span>
            )}
          </div>
          <Controller
            name="badge"
            control={control}
            rules={{ required: "Badge is required" }}
            render={({ field }) => (
              <select
                className={inputClass}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <option value="">Select Badge</option>
                {INSURANCE_BADGES.map((b) => (
                  <option key={b} value={b}>
                    {formatBadge(b)}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* Claims In */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Claims Processed In
            </label>
            {errors.claimsIn && (
              <span className="text-rose-500 text-[10px]">
                {errors.claimsIn.message}
              </span>
            )}
          </div>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. 5-7 days"
            {...register("claimsIn")}
          />
        </div>

        {/* Price From */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Price From (AED/mo) *
            </label>
            {errors.priceFrom && (
              <span className="text-rose-500 text-[10px]">
                {errors.priceFrom.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="50"
            {...register("priceFrom", {
              required: "Required",
              min: { value: 0, message: "Must be 0 or more" },
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Price To */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Price To (AED/mo) *
            </label>
            {errors.priceTo && (
              <span className="text-rose-500 text-[10px]">
                {errors.priceTo.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="200"
            {...register("priceTo", {
              required: "Required",
              min: { value: 0, message: "Must be 0 or more" },
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Annual Limit */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Annual Limit (AED) *
            </label>
            {errors.annualLimit && (
              <span className="text-rose-500 text-[10px]">
                {errors.annualLimit.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="10000"
            {...register("annualLimit", {
              required: "Required",
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Reimbursement */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Reimbursement (%) *
            </label>
            {errors.reimbursement && (
              <span className="text-rose-500 text-[10px]">
                {errors.reimbursement.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="80"
            {...register("reimbursement", {
              required: "Required",
              min: { value: 0, message: "Must be between 0-100" },
              max: { value: 100, message: "Must be between 0-100" },
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Coverage Score */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Coverage Score (0-100) *
            </label>
            {errors.coverageScore && (
              <span className="text-rose-500 text-[10px]">
                {errors.coverageScore.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="85"
            {...register("coverageScore", {
              required: "Required",
              min: { value: 0, message: "Must be between 0-100" },
              max: { value: 100, message: "Must be between 0-100" },
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Max Age */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Max Pet Age (years) *
            </label>
            {errors.maxAgeYears && (
              <span className="text-rose-500 text-[10px]">
                {errors.maxAgeYears.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="10"
            {...register("maxAgeYears", {
              required: "Required",
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Min Age */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Min Pet Age (weeks) *
            </label>
            {errors.minAgeWeeks && (
              <span className="text-rose-500 text-[10px]">
                {errors.minAgeWeeks.message}
              </span>
            )}
          </div>
          <input
            type="number"
            className={inputClass}
            placeholder="8"
            {...register("minAgeWeeks", {
              required: "Required",
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* Pets covered */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
            Pets Covered *
          </label>
          {errors.pets && (
            <span className="text-rose-500 text-[10px]">
              {errors.pets.message}
            </span>
          )}
        </div>
        <Controller
          name="pets"
          control={control}
          rules={{
            validate: (v) => v.length > 0 || "Select at least one pet type",
          }}
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {PET_TYPES.map((pet) => (
                <label
                  key={pet}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={field.value.includes(pet)}
                    onChange={() =>
                      field.onChange(
                        field.value.includes(pet)
                          ? field.value.filter((v) => v !== pet)
                          : [...field.value, pet],
                      )
                    }
                    className="w-4 h-4 accent-steel-blue dark:accent-lime-burst"
                  />
                  <span className="text-[11px] capitalize text-gray-700 dark:text-gray-300">
                    {pet}
                  </span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Coverage flags */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
            Coverage Types
          </label>
          {errors.coverageFlags && (
            <span className="text-rose-500 text-[10px]">
              {errors.coverageFlags.message}
            </span>
          )}
        </div>
        <Controller
          name="coverageFlags"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COVERAGE_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={field.value.includes(type)}
                    onChange={() =>
                      field.onChange(
                        field.value.includes(type)
                          ? field.value.filter((v) => v !== type)
                          : [...field.value, type],
                      )
                    }
                    className="w-4 h-4 accent-steel-blue dark:accent-lime-burst"
                  />
                  <span className="text-[11px] text-gray-700 dark:text-gray-300">
                    {formatCoverageType(type)}
                  </span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Array fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="plans"
          control={control}
          render={({ field }) => (
            <SimpleArrayInput
              label="Plans"
              value={field.value}
              onChange={field.onChange}
              placeholder="e.g. Basic, Premium"
              error={errors.plans?.message}
            />
          )}
        />
        <Controller
          name="highlights"
          control={control}
          render={({ field }) => (
            <SimpleArrayInput
              label="Highlights"
              value={field.value}
              onChange={field.onChange}
              placeholder="e.g. No waiting period"
              error={errors.highlights?.message}
            />
          )}
        />
        <Controller
          name="coveredConditions"
          control={control}
          render={({ field }) => (
            <SimpleArrayInput
              label="Covered conditions"
              value={field.value}
              onChange={field.onChange}
              placeholder="e.g. Hip dysplasia"
              error={errors.coveredConditions?.message}
            />
          )}
        />
        <Controller
          name="excludedConditions"
          control={control}
          render={({ field }) => (
            <SimpleArrayInput
              label="Excluded conditions"
              value={field.value}
              onChange={field.onChange}
              placeholder="e.g. Pre-existing conditions"
              error={errors.excludedConditions?.message}
            />
          )}
        />
      </div>

      {/* Logo upload + Contact in flex row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo upload */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
              Provider Logo *
            </label>
            {errors.logo && (
              <span className="text-rose-500 text-[10px]">
                {errors.logo.message}
              </span>
            )}
          </div>
          <Controller
            name="logo"
            control={control}
            rules={{ required: "Please upload a logo" }}
            render={({ field }) => (
              <CloudinaryUpload
                mode="single"
                value={field.value}
                onChange={(url) => field.onChange(url)}
                // error={errors.logo?.message}
              />
            )}
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
                Website
              </label>
              {errors.website && (
                <span className="text-rose-500 text-[10px]">
                  {errors.website.message}
                </span>
              )}
            </div>
            <input
              type="text"
              className={inputClass}
              placeholder="https://example.com"
              {...register("website")}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
                Phone *
              </label>
              {errors.phone && (
                <span className="text-rose-500 text-[10px]">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <input
              type="text"
              className={inputClass}
              placeholder="+971 4 ..."
              {...register("phone", { required: "Phone is required" })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
                Email *
              </label>
              {errors.email && (
                <span className="text-rose-500 text-[10px]">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              type="email"
              className={inputClass}
              placeholder="info@insurance.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-[11px] font-medium text-gray-500 dark:text-white/70">
            About *
          </label>
          {errors.about && (
            <span className="text-rose-500 text-[10px]">
              {errors.about.message}
            </span>
          )}
        </div>
        <textarea
          className={`${inputClass} resize-none h-24`}
          placeholder="Provider description..."
          {...register("about", {
            required: "A short description is required",
          })}
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => router.push("/admin/insurance-providers")}
          className="flex-1 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 font-medium text-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2.5 rounded-md bg-steel-blue dark:bg-lime-burst/80 text-white dark:text-gray-900 font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Add Provider"}
        </button>
      </div>
    </form>
  );
}
