import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { StatusBadge } from "../statusBadge";

interface Vehicle {
  image: string | StaticImageData;
  name: string;
  condition: "Used" | "New";
  status: "Sold Out" | "Available";
  vin: string;
  priceType?: string;
  price: number;
}

interface VehicleSummaryCardProps {
  readonly vehicle: Vehicle;
}

export default function VehicleSummaryCard({
  vehicle,
}: VehicleSummaryCardProps) {
  const isNew = vehicle.condition === "New";

  return (
    <Card className="border border-gray-200 shadow-sm ">
      <CardContent className="">
        <h3 className="text-sm font-semibold text-[#1E5D2D] mb-2">
          Selected Vehicle
        </h3>

        <div className="flex flex-col sm:flex-row md:flex-row gap-3 md:gap-4">
          <div className="w-full sm:w-[100px] md:w-[120px] h-[180px] sm:h-[100px] md:h-[120px] rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              width={133}
              height={133}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center md:flex-row md:items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
              <h4 className="text-base sm:text-lg md:text-lg font-semibold text-gray-800 truncate">
                {vehicle.name}
              </h4>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                <Badge
                  className={`${
                    isNew
                      ? "bg-[#28A745] text-[#F1FCF2]"
                      : "bg-[#6C757D] text-white "
                  } text-xs px-2 sm:px-3 md:px-3 py-0.5 rounded-full font-normal`}
                >
                  {vehicle.condition}
                </Badge>

                <StatusBadge status={vehicle.status} />
              </div>
            </div>
            <div className="flex items-center max-w-[228px] bg-[#F8F9FA] px-2 sm:px-3 md:px-3 py-1.5 rounded-md text-xs sm:text-sm md:text-sm text-gray-700">
              <span className="h-2 w-2 rounded-full bg-gray-400 mr-2 flex-shrink-0"></span>
              <span className=" text-[#353D45] mr-1">VIN:</span>
              <span className=" text-[#45535F] text-sm truncate">{vehicle.vin}</span>
            </div>

            <div>
              <div className="flex flex-col xs:flex-row xs:items-center md:flex-row md:items-center gap-1 xs:gap-2 md:gap-2">
                <span className="text-xs sm:text-sm md:text-sm text-gray-700">Price</span>
                {vehicle.priceType && (
                  <Badge
                    variant="default"
                    className="text-[10px] sm:text-[11px] md:text-[11px] text-[#1A73E8] bg-[#EEF9FF] px-2 sm:px-3 md:px-3 py-0.5 font-medium rounded-full w-fit"
                  >
                    {vehicle.priceType}
                  </Badge>
                )}
              </div>
              <div className="text-lg sm:text-xl md:text-xl font-semibold text-gray-800">
                GHC{" "}
                {vehicle.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
