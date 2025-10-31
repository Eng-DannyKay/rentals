
import { Button } from '@/components/ui/button';
import { PhoneIcon, Phone } from 'lucide-react';
import { Separator } from './ui/separator';
import {LocationIcon ,MailIcon ,UserIcon} from '@/assets/imageIndex';
import Image from 'next/image';
import Link from 'next/link';


export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  location: string;
  
};
type PricingCardProps = {
  price: number;
  vehicleId: string;
};

 function PriceSection({ price ,vehicleId}: Readonly<PricingCardProps>) {
  return (
    <div >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-[#45535F]">Price</span>
        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Negotiable</span>
      </div>
      <div className="text-3xl font-bold text-[#45535F] mb-4">GH₵ {price.toLocaleString()}.00</div>
       {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full border-[#1A73E8] text-[#1A73E8]  hover:text-[#1A73E8]" child="Buy Now" />
          <div className="flex gap-2">
            <Link className="w-full flex" href={`/search/details/${vehicleId}/loan`}>
            <Button className="flex-1 bg-[#2D7EF8] hover:bg-[#1E6FE8] text-white" child=" Apply for loan" />
            </Link>
            <Button variant="outline" size="icon" className="border-[#1A73E8] text-[#1A73E8] hover:text-[#1A73E8]" child={<Phone className="w-4 h-4" />} />
          </div>
        </div>
    </div>
  );
}

function ContactInfoSection({ contactInfo }: { readonly contactInfo: ContactInfo }) {
  return (
    <div >
      <h3 className="text-sm font-semibold text-[#353D45] px-6 mb-6">CONTACT INFORMATION</h3>

     <Separator className='mb-4' />
      <div className="space-y-3 px-6  ">
        <div className="flex items-center gap-3 text-sm">
        <Image src={UserIcon} alt="User Icon" className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">{contactInfo.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
        <PhoneIcon className="w-4 h-4 text-gray-600" fill="currentColor" strokeWidth={0} />
          <span className="text-gray-700">{contactInfo.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Image src={MailIcon} alt="Mail Icon" className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">{contactInfo.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Image src={LocationIcon} alt="Location Icon" className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">{contactInfo.location}</span>
        </div>
      </div>
    </div>
  );
}


export {
    ContactInfoSection, PriceSection
};

