import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BluetoothIcon,LeatherIcon, HeatIcon,SunIcon,RainSensorIcon,AirConditioningIcon,KeyIcon} from '@/assets/imageIndex';
import { CircleHelp } from 'lucide-react';

import Image from 'next/image';
import React from 'react';

type VehicleInfo = {
  make: string;
  model: string;
  year: string | number;
  trimLevel: string;
  vin: string;
};

type Feature = {
  name: string;
  available: boolean;
};

type FeaturesCardProps = {
  readonly vehicleInfo: VehicleInfo;
  readonly features: readonly Feature[];
};

const infoLabels = [
  { label: 'Make', value: (v: VehicleInfo) => v.make },
  { label: 'Model', value: (v: VehicleInfo) => v.model },
  { label: 'Year', value: (v: VehicleInfo) => v.year },
  { label: 'Trim Level', value: (v: VehicleInfo) => v.trimLevel },
  { label: 'VIN', value: (v: VehicleInfo) => v.vin },
];

const featureIcons: Record<string, React.ReactNode> = {
  'Air Conditioning': <Image src={AirConditioningIcon} alt="Air Conditioning" className="w-5 h-5 text-gray-500" />,
  Bluetooth: <Image src={BluetoothIcon} alt="Bluetooth" className="w-5 h-5 text-gray-500" />,
  'Heated Seats': <Image src={HeatIcon} alt="Heated Seats" className="w-5 h-5 text-gray-500" />,
  Sunroof: <Image src={SunIcon} alt="Sunroof" className="w-5 h-5 text-gray-500" />,
  'Leather Seats': <Image src={LeatherIcon} alt="Leather Seats" className="w-5 h-5 text-gray-500" />,
  'Keyless Entry': <Image src={KeyIcon} alt="Keyless Entry" className="w-5 h-5 text-gray-500" />,
  'Rain Sensors': <Image src={RainSensorIcon} alt="Rain Sensors" className="w-5 h-5 text-gray-500" />,
};

export default function FeaturesCard({ vehicleInfo, features }: FeaturesCardProps) {
  return (
    <Card className="border-gray-200 rounded-sm">      
   <div className="px-4">
    <h1 className="text-sm font-semibold  text-[#353D45]">VEHICLE INFO & FEATURES</h1>
    </div>
     <Separator  />
      <CardContent className="p-0">
        {/* Vehicle Info */}
        <div className="flex flex-col gap-4 px-4 pb-2">
          {infoLabels.map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded-sm">
              <span className="w-[8px] h-[8px] text-[#B2BEC7] bg-[#B2BEC7] rounded-full"></span>
              <span className="text-xs text-[#353D45] font-medium ">{label}:</span>
              <span className="bg-gray-50 rounded px-2 py-1 text-xs text-[#45535F]  tracking-wide">{value(vehicleInfo)}</span>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className=" mt-2 pt-3  ">
            <Separator className='mb-4' />
          <div className="flex flex-col gap-3 px-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-3 text-sm">
                  <span>
                  {featureIcons[feature.name] ?? (
                    <CircleHelp className="w-5 h-5 text-gray-400" />
                  )}
                </span>
                <span className="text-[#353D45] ">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
