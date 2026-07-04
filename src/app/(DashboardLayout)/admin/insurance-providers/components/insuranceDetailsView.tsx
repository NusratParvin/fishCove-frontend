"use client";

import { Chip, Spinner } from "@heroui/react";
import { useGetProviderReviewsQuery } from "@/src/redux/features/insuranceReview/insuranceReviewApi";
import {
  formatBadge,
  formatCoverageType,
  formatPriceRange,
  capitalize,
} from "./insuranceUtils";

export default function InsuranceDetailsView({ provider }: { provider: any }) {
  const { data: reviewData, isLoading } = useGetProviderReviewsQuery(
    provider._id,
  );
  // const reviewData = data?.data;

  return (
    <div className="space-y-4 sm:space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-sm sm:text-xl font-bold text-foreground">
            {provider.name}
          </h2>
          {provider.badge && (
            <Chip size="sm" variant="flat" className="mt-2">
              {formatBadge(provider.badge)}
            </Chip>
          )}
          <div className="flex gap-2 mt-2">
            <Chip
              size="sm"
              variant="flat"
              classNames={{
                base: "bg-warning/10 text-warning-600 dark:text-warning-400",
              }}
            >
              ⭐ {provider.avgRating?.toFixed(1) || "0.0"} (
              {provider.reviewCount || 0} reviews)
            </Chip>
          </div>
        </div>
        <div className="sm:flex-shrink-0 me-6">
          <img
            src={
              provider.logo ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=0D8F81&color=fff`
            }
            alt={provider.name}
            className="w-full sm:w-56 h-40 sm:h-40 rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Basic info */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-divider pb-2">
            Plan Details
          </h3>
          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Price range
            </label>
            <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
              {formatPriceRange(provider.priceFrom, provider.priceTo)}
            </p>
            <p className="text-xs text-default-500 mt-1">per month</p>
          </div>
          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Annual limit
            </label>
            <p className="text-sm text-foreground mt-1 font-medium">
              AED {provider.annualLimit}
            </p>
          </div>
          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Reimbursement
            </label>
            <p className="text-sm text-foreground mt-1 font-medium">
              {provider.reimbursement}%
            </p>
          </div>
          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Claims processed in
            </label>
            <p className="text-sm text-foreground mt-1 font-medium">
              {provider.claimsIn}
            </p>
          </div>
          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Coverage score
            </label>
            <p className="text-sm text-foreground mt-1 font-medium">
              {provider.coverageScore}%
            </p>
          </div>
        </div>

        {/* Coverage */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-divider pb-2">
              Coverage Types
            </h3>
            <div className="flex flex-wrap gap-2 pt-3">
              {provider.coverageFlags?.map((flag: string) => (
                <Chip
                  key={flag}
                  variant="flat"
                  classNames={{
                    base: "bg-lime-burst/40 text-default-700 dark:text-white",
                  }}
                >
                  {formatCoverageType(flag)}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Pets covered
            </label>
            <div className="flex flex-wrap gap-2 pt-2">
              {provider.pets?.map((pet: string) => (
                <Chip key={pet} size="sm" variant="flat" className="capitalize">
                  {pet}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-default-500 uppercase tracking-wider">
              Age limits
            </label>
            <p className="text-sm text-foreground mt-1">
              {provider.minAgeWeeks} weeks – {provider.maxAgeYears} years
            </p>
          </div>
        </div>

        {/* About */}
        {provider.about && (
          <div className="space-y-3 sm:space-y-4 lg:col-span-2">
            <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-divider pb-2">
              About
            </h3>
            <p className="text-sm text-default-600 dark:text-default-400 leading-relaxed">
              {provider.about}
            </p>
          </div>
        )}

        {/* Highlights */}
        {provider.highlights?.length > 0 && (
          <div className="lg:col-span-2">
            <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-divider pb-2 mb-3">
              Highlights
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {provider.highlights.map((h: string, i: number) => (
                <li
                  key={i}
                  className="text-sm text-default-600 dark:text-default-400"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact */}
        <div className="lg:col-span-2">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-divider pb-2 mb-3">
            Contact
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-foreground flex items-center gap-2">
              📞 {provider.phone}
            </p>
            <p className="text-sm text-foreground flex items-center gap-2">
              ✉️ {provider.email}
            </p>
            {provider.website && (
              <p className="text-sm flex items-center gap-2">
                🌐{" "}
                <a
                  href={
                    provider.website.startsWith("http")
                      ? provider.website
                      : `https://${provider.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-blue dark:text-lime-burst hover:underline"
                >
                  {provider.website}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="lg:col-span-2">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-divider pb-2 mb-3">
            Reviews {reviewData ? `(${reviewData.count})` : ""}
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-6">
              <Spinner size="sm" />
            </div>
          ) : !reviewData?.reviews?.length ? (
            <p className="text-sm text-default-400">
              No reviews yet for this provider.
            </p>
          ) : (
            <div className="space-y-3">
              {reviewData.reviews.map((review: any) => (
                <div
                  key={review._id}
                  className="bg-default-50 dark:bg-default-100/5 rounded-lg p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {review.user?.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-warning-600">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  {review.planUsed && (
                    <p className="text-xs text-default-400">
                      Plan: {review.planUsed}
                    </p>
                  )}
                  <p className="text-sm text-default-600 dark:text-default-400">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
