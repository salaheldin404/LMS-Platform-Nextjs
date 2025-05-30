import { Skeleton } from "@/components/ui/skeleton";
const MainContentSkeleton = () => {
  return (
    <div className='space-y-4'>
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
};

export default MainContentSkeleton;
