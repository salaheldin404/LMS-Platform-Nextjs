import { Skeleton } from "@/components/ui/skeleton";

export const CoursesSectionSkeleton = () => {
  return (
    <div className="md:basis-full">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-8 w-[160px]" />
        <Skeleton className="h-6 w-12" />
      </div>

      {/* Course Grid Skeleton */}
      <div className="grid grid-cols-1 min-[550px]:grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className=" rounded-lg p-3">
            {/* Image Skeleton */}
            <Skeleton className="h-[180px] w-full rounded-lg mb-3" />

            {/* Title Skeleton */}
            <Skeleton className="h-5 w-3/4 mb-2" />

            {/* Description Skeletons */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-3" />

            {/* Progress Bar Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-4 w-8" />
            </div>

            {/* Stats Skeletons */}
            <div className="flex justify-between mt-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
