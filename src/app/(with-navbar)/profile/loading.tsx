import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col space-y-3 pt-[150px] items-center justify-center">
      <div className="space-y-6 w-[300px]">
        {/* First Input */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>

        {/* Second Input */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 w-full rounded-md mt-4" />
      </div>
    </div>
  );
};
export default Loading;
