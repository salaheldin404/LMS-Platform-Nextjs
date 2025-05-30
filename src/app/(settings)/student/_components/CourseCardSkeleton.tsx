import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="relative bg-card rounded border max-w-[350px]">
      {/* Image Placeholder */}
      <div className="relative w-full aspect-[16/9]">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Title Placeholder */}
      <div className="p-4 border-b mb-3">
        <Skeleton className="h-6 w-3/4" />
      </div>

      {/* Button and Progress Text Placeholder */}
      <div className="flex items-center gap-3 p-4">
        <Skeleton className="flex-1 h-8 rounded" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Progress Bar Placeholder */}
      <div className="absolute bottom-0 left-0 h-1 w-full">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
