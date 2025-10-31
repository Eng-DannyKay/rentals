"use client";
import { ProfileIcon, VerifiedIcon } from "@/assets/imageIndex";
import ImageGallery from "@/components/imageGallery";
import { ContactInfoSection, PriceSection } from "@/components/pricingCard";
import { DescriptionCard, SpecsCard } from "@/components/specsCard";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import NoData from "@/components/ui/no-data";
import {
  selectVehicleDetails,
  selectVehicleDetailsError,
  selectVehicleDetailsLoading,
} from "@/lib/features/search/searchSelector";
import { fetchVehicleDetails } from "@/lib/features/search/searchThunk";
import type { AppDispatch } from "@/lib/store";
import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { VehicleDetailsSkeleton } from "../../_components/carCardSkeleton";
import FeaturesCard from "./featuresCard";
import StatusBadge from "@/components/statusBadge";
import { ApplicationStatus } from "@/types/loan.interface";

export default function VehicleDetailsClient() {
  const params = useParams();
  const vehicleId = params.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const vehicle = useSelector(selectVehicleDetails);
  const loading = useSelector(selectVehicleDetailsLoading);
  const error = useSelector(selectVehicleDetailsError);

  useEffect(() => {
    if (vehicleId) {
      dispatch(fetchVehicleDetails(vehicleId));
    }
  }, [vehicleId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) return <VehicleDetailsSkeleton />;
  if (!vehicle) return <NoData message="No vehicle found." />;

  // Prepare data for child components based on CarListing interface
  let images: string[] | StaticImageData[] = [];
  if (vehicle.images && vehicle.images.length > 0) {
    images = vehicle.images;
  }

  const specs = {
    engine: vehicle.condition, // No engineType in CarListing, using condition as placeholder
    fuel: vehicle.fuelType,
    mileage: `${vehicle.mileage} km`,
    drive: "Front-Wheel Drive", // Not provided in API
    transmission: vehicle.transmission,
    seats: vehicle.seatingCapacity ? Number(vehicle.seatingCapacity) : 0,
    exteriorColor: vehicle.color,
    interiorColor: vehicle.color 
  };
  const vehicleInfo = {
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    trimLevel: vehicle.category ?? "EX",
    vin: vehicle.identificationNumber,
  };
  const features = (vehicle.features || []).map((f) => ({ name: f, available: true }));
  const contactInfo = {
    name: vehicle.vendorSnapshot?.name ?? "Michael Thompson",
    phone: vehicle.vendorSnapshot?.contact ?? "(416) 555-0123",
    email: "m.thompson@dealer.com", // Not provided in API
    location: `${vehicle.city }, ${vehicle.region }`,
  };
  const description = vehicle.description ?? "No description available.";
  const availabilityStatus = vehicle.availabilityStatus as ApplicationStatus ?? "Available";

  return (
    <div className="min-h-screen">
      <div className="bg-[#F8F9FA]  px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        <Breadcrumb
          items={[
            { label: "Search Cars", href: "/search" },
            { label: `${vehicle.make} ${vehicle.model} ${vehicle.year}`, active: true },
          ]}
        />

        <div className="flex flex-col md:flex-row justify-between bg-[#FFFFFF] rounded-sm border border-gray-200 py-5 px-6 items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#353D45]">{vehicle.make} {vehicle.model} {vehicle.year}</h1>
           <Badge
              variant="outline"
               className={`${vehicle.condition == "Brand New" ? "bg-[#28A745] text-[#F1FCF2]" : "bg-[#00000080] text-white"} flex items-center gap-2 p-2.5 h-6  rounded-[32px] border-none`}
            >
              <span className="font-normal text-xs leading-4">{vehicle.condition}</span>
            </Badge>
            <StatusBadge status={availabilityStatus} />
          </div>

          <div className="flex flex-col items-end gap-2 rounded-lg">
            <Badge
              variant="outline"
              className="h-7 flex items-center gap-2 p-2 bg-[#00000080] text-white rounded-[32px] border-none"
            >
              <div className="inline-flex items-center gap-1">
                <div className="w-4 h-4 rounded-full">
                  <Image src={ProfileIcon} alt="Profile Icon" />
                </div>
                <span className="font-medium text-sm text-center leading-[14px]">
                  {vehicle.vendorSnapshot?.name || "Runner Motors"}
                </span>
                <div>
                  <Image src={VerifiedIcon} alt="Verified" />
                </div>
              </div>
            </Badge>

            <div className="flex items-center gap-1 text-[#45535F]">
              <span className="text-sm ">{vehicle.city || "-"}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ">{vehicle.vendorSnapshot?.rating?.toFixed(2) || 5}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ImageGallery images={images} />
          </div>

            <div className="space-y-10">
              <Card className="border-gray-200 shadow-sm p-6 space-y-6 rounded-sm sticky top-0">
                <PriceSection price={vehicle.price} vehicleId={vehicle.id} />
              </Card>

              <Card className="border-gray-200 shadow-sm  space-y-6 rounded-sm">
                <ContactInfoSection contactInfo={contactInfo} />
              </Card>
            </div>
        </div>

        {/* Specs and Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <SpecsCard specs={specs} />
            {/* Description */}
            <DescriptionCard description={description} hasNoIssues={true} />
          </div>
          <div>
            <FeaturesCard vehicleInfo={vehicleInfo} features={features} />
          </div>
        </div>
      </div>
    </div>
  );
}
