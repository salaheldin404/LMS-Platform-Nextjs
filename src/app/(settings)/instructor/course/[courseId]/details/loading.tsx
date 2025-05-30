import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="bg-card p-4 flex flex-col md:flex-row items-start gap-4">
      <Skeleton className="w-[300px] h-[300px]" />
      <div className="flex-1 w-full space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-5 w-5" />
            ))}
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
