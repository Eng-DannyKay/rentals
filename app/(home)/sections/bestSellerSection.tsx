import React from "react";
import Title from "../_components/title";
import { DiagonalLink } from "@/assets/imageIndex";
import Image from "next/image";
import CarCard from "@/components/carCard";
import { carListings } from "@/constants/constants";

const BestSellerSection = () => {


  return (
    <div className=" px-10 mt-8">
      <div className="flex justify-between items-center">
        <Title title="Best Sellers" />
        <div className="inline-flex items-center gap-2 cursor-pointer">
          <span className="text-[#007aff] text-center leading-[15px] font-['DM_Sans',Helvetica] font-medium text-[15px] tracking-[0] whitespace-nowrap">
            View All
          </span>
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Image src={DiagonalLink} alt="Link" width={14} height={14} />
          </div>
        </div>
      </div>

      <section className="flex flex-col w-full items-start gap-4 py-8 relative">
        <div className="flex overflow-x-auto items-center gap-5 w-full">
          {carListings.map((car) => (
            <CarCard
              key={car.id}
              {...car}
              images={car.images.map((img: string | { src: string }) => (typeof img === "string" ? img : img.src))}
              fixedWidth={false}
              shouldRoute={false}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />
      </section>
    </div>
  );
};

export default BestSellerSection;
