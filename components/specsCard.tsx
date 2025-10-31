import {
  AutomaticEngineIcon,
  CarIcon,
  CarSeats,
  FrontWheelIcon,
  GasIcon,
  GreyCarIcon,
  InlineCylinderIcon,
  ManualIcon,
  SpeedometerIcon,
} from "@/assets/imageIndex";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SpecIconProps {
  icon: string;
  label: string;
  value: string;
}
interface DescriptionCardProps {
  description: string;
  hasNoIssues: boolean;
}

const SpecIcon = ({ icon, label, value }: SpecIconProps) => (
  <div className="flex flex-col items-center text-center gap-2">
    <Image src={icon} alt={label} className="w-8 h-8" />
    <div className="text-xs font-medium text-gray-900">{value}</div>
    <div className="text-xs text-[#45535F]">{label}</div>
  </div>
);

interface Specs {
  engine: string;
  fuel: string;
  mileage: string;
  drive: string;
  transmission: string;
  seats: number;
  exteriorColor: string;
  interiorColor: string;
}

function SpecsCard({ specs }: { readonly specs: Specs }) {
  const transmissionIcon = specs.transmission.toLowerCase().includes("manual")
    ? ManualIcon
    : AutomaticEngineIcon;

  return (
    <Card className="border-gray-200 rounded-sm">
      <div className="px-6">
        <h1 className="text-sm font-semibold text-[#353D45]">
          ENGINE & PERFORMANCE
        </h1>
      </div>
      <Separator />
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SpecIcon icon={InlineCylinderIcon} value={specs.engine} label="" />
          <SpecIcon icon={GasIcon} value={specs.fuel} label="" />
          <SpecIcon icon={SpeedometerIcon} value={specs.mileage} label="" />
          <SpecIcon icon={FrontWheelIcon} value={specs.drive} label="" />
          <SpecIcon
            icon={transmissionIcon}
            value={specs.transmission}
            label=""
          />
          <SpecIcon icon={CarSeats} value={`${specs.seats} Seats`} label="" />
          <SpecIcon icon={GreyCarIcon} value={specs.exteriorColor} label="" />
          <SpecIcon icon={CarIcon} value={specs.interiorColor} label="" />
        </div>
      </CardContent>
    </Card>
  );
}

function DescriptionCard({
  description,
  hasNoIssues,
}: Readonly<DescriptionCardProps>) {
  return (
    <Card className="border-gray-200 rounded-sm">
      <div className="px-6">
        <h1 className="text-sm font-semibold text-gray-900">DESCRIPTION</h1>
      </div>
      <Separator />
      <CardContent className="space-y-4">
        {hasNoIssues && (
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-[#58D073] rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 15C9.45 15 9 14.55 9 14V10C9 9.45 9.45 9 10 9C10.55 9 11 9.45 11 10V14C11 14.55 10.55 15 10 15ZM11 7H9V5H11V7Z"
                fill="#1E5D2D"
              />
            </svg>

            <p className="text-sm text-[#1E5D2D]">
              Vehicle has been garage-kept and comes with complete service
              records. Non-smoking owner. All maintenance up to date including
              recent oil change and inspection.
            </p>
          </div>
        )}

        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
          <p>{description}</p>
        </div>

        <Button
          variant="outline"
          className="w-full sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-50"
          child="Express interest"
        />
      </CardContent>
    </Card>
  );
}

export { DescriptionCard, SpecsCard };
