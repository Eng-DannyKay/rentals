import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CarCardSkeletonProps {
  fixedWidth?: boolean;
  className?: string;
}

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
        className
      )}
    />
  );
};

 const CarCardSkeleton = ({
  fixedWidth = false,
  className,
}: CarCardSkeletonProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center gap-2 p-0 bg-white border shadow-none border-[#D6DCE1] overflow-hidden",
        fixedWidth ? "w-[325px]" : "w-full",
        className
      )}
    >
      <div className="relative w-full h-[243px] bg-gray-100 overflow-hidden rounded-t-sm">
        <Skeleton className="w-full h-full" />

        <div className="flex w-[calc(100%-10px)] items-center justify-between absolute top-[9px] left-1.5">
          <Skeleton className="h-7 w-32 rounded-[32px] bg-gray-300" />
          <Skeleton className="h-[18px] w-24 rounded-2xl bg-gray-300" />
        </div>

        <div className="inline-flex items-center gap-2 absolute top-[211px] left-1.5">
          <Skeleton className="h-6 w-16 rounded-[32px] bg-gray-300" />
          <Skeleton className="h-6 w-16 rounded-[32px] bg-gray-300" />
        </div>
      </div>

      <CardContent className="flex flex-col w-full items-start gap-[25px] p-0 pb-4 px-4">
        <div className="flex flex-col items-start gap-[11px] w-full">
          <div className="flex flex-col items-start gap-1.5 w-full">
            <div className="flex items-baseline justify-between w-full">
              <div className="flex flex-col w-[182px] items-start gap-1">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-[18px] w-3/4 rounded-md" />
              </div>
              <Skeleton className="h-[30px] w-20 rounded-md" />
            </div>
            <div className="w-full h-px bg-gray-200" />
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col w-[55.52px] items-center gap-2">
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
              <Skeleton className="h-3.5 w-14 rounded-md" />
            </div>
            <div className="flex flex-col w-[37.63px] items-center gap-2">
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
              <Skeleton className="h-3.5 w-14 rounded-md" />
            </div>
            <div className="flex flex-col w-[67.84px] items-center gap-2">
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
              <Skeleton className="h-3.5 w-14 rounded-md" />
            </div>
            <div className="flex flex-col w-[67.84px] items-center gap-2">
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
              <Skeleton className="h-3.5 w-14 rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-2">
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};



 const VehicleDetailsSkeleton = () => {
  return (
   <div className="min-h-screen">
      <div className="bg-[#F8F9FA] px-10 py-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Header Section Skeleton */}
        <div className="flex flex-col md:flex-row justify-between bg-[#FFFFFF] rounded-sm border border-gray-200 py-6 px-6 items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-green-200 rounded-full animate-pulse"></div>
          </div>

          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <div className="h-7 w-40 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-yellow-300 rounded-full animate-pulse"></div>
              <div className="h-4 w-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Image Gallery and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Image Gallery Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
              <div className="h-96 bg-gray-300 animate-pulse"></div>
              <div className="flex gap-2 p-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 w-16 bg-gray-300 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Price and Contact Cards Skeleton */}
          <div className="space-y-10">
            {/* Price Card */}
            <div className="border border-gray-200 shadow-sm p-6 rounded-sm bg-white">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="border border-gray-200 shadow-sm p-6 rounded-sm bg-white">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specs and Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Specs Card */}
            <div className="border border-gray-200 shadow-sm p-6 rounded-sm bg-white">
              <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mb-6"></div>
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="border border-gray-200 shadow-sm p-6 rounded-sm bg-white">
              <div className="h-6 w-28 bg-gray-300 rounded animate-pulse mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="border border-gray-200 shadow-sm p-6 rounded-sm bg-white">
            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export { CarCardSkeleton, VehicleDetailsSkeleton };
