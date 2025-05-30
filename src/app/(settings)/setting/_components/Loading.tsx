import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  componentType: "basic-form" | "social-form";
}

const skeletonTemplates = {
  "basic-form": (
    <div className="bg-card h-[400px] flex gap-4 px-8 py-4 my-4">
      <div className="basis-3/4 space-y-4">
        <Skeleton className="h-8 w-full" aria-busy="true" role="status" />
        <Skeleton className="h-8 w-full" aria-busy="true" role="status" />
        <Skeleton className="h-8 w-full" aria-busy="true" role="status" />
        <Skeleton className="h-7 w-26" aria-busy="true" role="status" />
      </div>
      <div className="lg:basis-[20%] w-20 h-20 md:w-40 md:h-40 rounded-md relative">
        <Skeleton
          className="rounded-md h-[160px] w-[160px]"
          aria-busy="true"
          role="status"
        />
      </div>
    </div>
  ),
  "social-form": (
    <div className="bg-card h-[400px] space-y-4 gap-4 px-8 py-4 my-4">
      <Skeleton className="h-8 w-full" aria-busy="true" role="status" />
      <Skeleton className="h-8 w-full" aria-busy="true" role="status" />
      <Skeleton className="h-8 w-full" aria-busy="true" role="status" />
      <Skeleton className="h-7 w-26" aria-busy="true" role="status" />
    </div>
  ),
};

const Loading = ({ componentType }: IProps) => {
  return skeletonTemplates[componentType] || null;
};

export default Loading;
