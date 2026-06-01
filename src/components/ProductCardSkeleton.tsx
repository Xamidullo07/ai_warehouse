export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg bg-white p-3 shadow-sm max-w-xs sm:max-w-sm md:max-md w-full">
      {/* Image Skeleton */}
      <div className="mb-4 aspect-3/4 w-full animate-pulse rounded-lg bg-gray-200" />

      {/* Price Skeleton */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Title Skeleton */}
      <div className="mb-3 flex-1">
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Rating Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
        <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};