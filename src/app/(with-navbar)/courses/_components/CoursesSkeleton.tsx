import { Skeleton } from "@/components/ui/skeleton";

export const CoursesSkeleton = () => {
  return (
    <div className="py-4">
      {/* <div className="container py-4"> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[300px]">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};
