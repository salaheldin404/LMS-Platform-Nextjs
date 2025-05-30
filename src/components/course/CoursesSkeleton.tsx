import { Skeleton } from "@/components/ui/skeleton";

export const CoursesSkeleton = () => {
  return (
    <div className="py-4">
      {/* <div className="container py-4"> */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[300px]">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div> */}

      {/* </div> */}
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-6" />
      </div>

      {/* Courses Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className=" rounded-lg overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="h-48 w-full" />

            <div className="p-4 space-y-3">
              {/* Title Skeleton */}
              <Skeleton className="h-6 w-3/4" />

              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Stats Skeleton */}
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-6 flex justify-center gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
};
