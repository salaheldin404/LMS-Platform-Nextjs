import { Skeleton } from "@/components/ui/skeleton";

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="rounded flex flex-wrap items-center bg-card p-4 justify-between border-b mb-4">
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        {/* Avatar Skeleton */}
        <div className="relative md:w-[100px] md:h-[100px] rounded-full">
          <Skeleton className="w-16 h-16 md:w-[100px] md:h-[100px] rounded-full" />
        </div>

        {/* User Info Skeleton */}
        <div className="space-y-3 flex-1">
          <Skeleton className="h-8 w-[200px] md:w-[300px]" />
          <Skeleton className="h-5 w-[150px] md:w-[250px]" />

          {/* Stats Skeleton */}
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links Skeleton */}
      <div className="md:mt-0 mt-4 flex gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-full" />
        ))}
      </div>
    </div>
  );
};
