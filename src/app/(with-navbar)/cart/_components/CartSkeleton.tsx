import { Skeleton } from "@/components/ui/skeleton";

export const CartSkeleton = () => (
  <div className="main-section">
    <div className="container">
      <div className="mb-8">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Cart Items */}
        <div className="flex-1">
          <div className="rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>

            {/* Two placeholder items */}
            {[1, 2].map((i) => (
              <div key={i} className="p-6 border-b">
                <div className="flex gap-4">
                  <Skeleton className="w-[120px] h-[68px]" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />

                    <div className="flex gap-4">
                      {[1, 2, 3].map((j) => (
                        <Skeleton key={j} className="h-4 w-16" />
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-28" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartSkeleton;
