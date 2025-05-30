import { Skeleton } from "@/components/ui/skeleton";

const StatsLoading = () => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] flex-1 w-full lg:w-auto">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card p-4 flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsLoading;
