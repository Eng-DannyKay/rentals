'use client'
import {
  CarSeats,
  GasIcon,
  ManualIcon,
  ProfileIcon,
  SpeedometerIcon,
  VerifiedIcon,
} from "@/assets/imageIndex";
import { cn } from "@/lib/utils";
import { CarListing, Seller } from "@/types/search.interface";
import { PhoneIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { StatusBadge } from "./statusBadge";
import { ApplicationStatus } from "@/types/loan.interface";


interface CarCardProps extends CarListing {
  fixedWidth?: boolean;
  location?: string;
  shouldRoute?: boolean;
}

const CarCard = ({
  _id,
  make,
  model,
  year,
  price,
  fuelType,
  mileage,
  transmission,
  images,
  vendorSnapshot,
  city,
  region,
  seatingCapacity,
  condition,
  inspectionAllowed,
  fixedWidth = true,
  location,
  shouldRoute = true,
  availabilityStatus = "Available",
}: CarCardProps) => {


  const defaultImageUrl = images?.[0];

  const carLocation = location || [city, region].filter(Boolean).join(", ");
  const vendor: Seller | null = vendorSnapshot;
  const dealerName = vendor?.name ?? "Runner Motors";
  const rating = vendor?.rating ?? 4.5;
  const contactNumber = vendor?.contact ?? "+233000000000";

  const normalizedFuelType = fuelType
    ? fuelType
        .split('/')
        .map(p => p.trim())
        .join('/')
    : '';
  const FUEL_MAX_LEN = 9; 
  const displayFuelType = normalizedFuelType.length > FUEL_MAX_LEN
    ? normalizedFuelType.slice(0, FUEL_MAX_LEN - 1) + '…'
    : normalizedFuelType;
 

   const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    globalThis.location.href = `tel:${contactNumber}`;
  };

  const cardContent = (
    <Card
      className={cn(
        "flex flex-col items-center gap-2 p-0 bg-white border shadow-none border-[#D6DCE1] overflow-hidden",
        shouldRoute && "cursor-pointer hover:shadow-sm transition-shadow",
        fixedWidth ? "w-[325px]" : "w-full"
      )}
    >
        <div
          className="relative w-full h-[243px] bg-cover rounded-t-sm bg-gray-100"
          style={{ backgroundImage: `url('${defaultImageUrl}')` }}
        >
          {/* Dealer and Condition badges at top */}
          <div className="flex w-[calc(100%-10px)] items-center justify-between absolute top-[9px] left-1.5">
            <Badge
              variant="outline"
              className="h-7 flex items-center gap-2 p-2 bg-[#00000080] text-white rounded-[32px] border-none"
            >
              <div className="inline-flex items-center gap-1">
                <div className="w-4 h-4 rounded-full">
                  <Image src={ProfileIcon} alt="Profile Icon" />
                </div>
                <span className="font-medium text-sm text-center leading-[14px]">
                   {dealerName}
                </span>
                <div>
                  <Image src={VerifiedIcon} alt="Verified" />
                </div>
              </div>
            </Badge>

            <Badge
              variant="outline"
               className={`${condition == "Brand New" ? "bg-[#28A745] text-[#F1FCF2]" : "bg-[#00000080] text-white"} flex items-center gap-2 p-2.5 h-6  rounded-[32px] border-none`}
            >
              <span className="font-normal text-xs leading-4">{condition}</span>
            </Badge>
          </div>
          <div  className="flex w-[calc(100%-10px)] items-center justify-between absolute bottom-[9px] left-1.5">
            <span></span>
            <StatusBadge className="flex item-center justify-end" status={availabilityStatus as ApplicationStatus} />
          </div>
        </div>

        <CardContent className="flex flex-col w-full items-start gap-[25px] p-0 pb-4 px-4">
          {/* Header with title, location/rating, and price */}
          <div className="flex flex-col items-start gap-[11px] w-full">
            <div className="flex flex-col items-start gap-1.5 w-full">
              <div className="flex items-baseline justify-between w-full">
                <div className="flex flex-col w-[182px] items-start gap-1">
                  <h3 className="w-full mt-[-1px] font-medium text-[#050b20] text-base leading-5 truncate"  title={`${make} ${model} ${year}`}>
                   {make} {model} {year}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#6c6c83]">
                    <span>{carLocation}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{rating}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-[#050b20] text-base leading-[30px]">
                  GH₵ {typeof price === "number" ? price.toLocaleString() : "N/A"}
                </span>
              </div>
              <Separator className="w-full h-px" />
            </div>

            {/* Specifications row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col w-[55.52px] items-center gap-2">
                <div className="w-[18px] h-[18px]">
                  <Image src={SpeedometerIcon} alt="speedometer Icon" />
                </div>
                <span className="w-full h-3.5 font-normal text-[#050b20] text-sm text-center leading-[14px]">
                {mileage} km
                </span>
              </div>

              <div className="flex flex-col w-[37.63px] items-center gap-2">
                <div className="w-[18px] h-[18px]">
                  <Image src={GasIcon} alt="Gas icon" />
                </div>
                <span
                  className="w-full h-3.5 font-normal text-[#050b20] text-sm text-center leading-[14px]"
                  title={normalizedFuelType}
                >
                  {displayFuelType}
                </span>
              </div>

              <div className="flex flex-col w-[67.84px] items-center gap-2">
                <div className="w-[18px] h-[18px]">
                  <Image src={ManualIcon} alt="manual icon" />
                </div>
                <span className="w-full h-3.5 font-normal text-[#050b20] text-sm text-center leading-[14px]">
                  {transmission}
                </span>
              </div>

              <div className="flex flex-col w-[67.84px] items-center gap-2">
                <div className="w-[18px] h-[18px]">
                  <Image src={CarSeats} alt="Car seats" />
                </div>
                <span className="w-full h-3.5 font-normal text-[#050b20] text-sm text-center leading-[14px]">
                  {seatingCapacity} Seats
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between w-full gap-2" onClick={(e) => e.stopPropagation()}>
            {inspectionAllowed === "Yes" && (
              <Button
                className="h-[44px] gap-2 p-2.5 bg-primary rounded-lg flex flex-1"
                disabled ={true}
                child={
                    <span className="font-medium text-white text-[15px] leading-[27.8px]">
                      Apply for loan
                    </span>
                }
              />
            )}
    
              <Button
                variant="outline"
                className="h-[44px] gap-2.5 p-2.5 rounded-lg border border-[#007aff]"
               onClick={handlePhoneClick}
                child={
                    <PhoneIcon fill="currentColor" className="w-4 h-4 text-primary" />
                }
              />
          
          </div>
        </CardContent>
    </Card>
  );

  return (
    <div>
      {shouldRoute ? (
        <Link href={`/search/${_id}`}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default CarCard;


