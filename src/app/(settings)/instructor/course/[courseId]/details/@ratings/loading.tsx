import { Skeleton } from "@/components/ui/skeleton";

const RatingsLoading = () => {
  return (
    <div className="bg-card p-4 flex-1 space-y-4 w-full lg:w-auto">
      <Skeleton className="h-6 w-[200px]" />
      <div>
        <div className="h-[300px] w-full">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  );
};

export default RatingsLoading;
