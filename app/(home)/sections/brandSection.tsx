import {
  audiLogo,
  BenzLogo,
  BMWLogo,
  FordLogo,
  HondaLogo,
  KiaLogo,
  LandRoverLogo,
  PorscheLogo,
  SuzukiLogo,
  TeslaLogo,
} from "@/assets/imageIndex";
import BrandMarquee from "@/app/(home)/_components/brandMarquee";
import Title from "@/app/(home)/_components/title";
import React from "react";

const BrandSection = () => {
  const brands = [
    { id: 1, name: "BMW", image: BMWLogo },
    { id: 2, name: "Tesla", image: TeslaLogo },
    { id: 3, name: "Ford", image: FordLogo },
    { id: 4, name: "kia", image: KiaLogo },
    { id: 5, name: "Honda", image: HondaLogo },
    { id: 6, name: "Audi", image: audiLogo },
    { id: 7, name: "Porsche", image: PorscheLogo },
    { id: 6, name: "Land Rover", image: LandRoverLogo },
    { id: 6, name: "suzuki", image: SuzukiLogo },
    { id: 7, name: "Benz", image: BenzLogo },
  ];
  return (
    <section className="w-full px-10 mt-8">
      <Title title="Our Premium Brands" />
      <div className="w-full h-[131px] mt-6 flex items-center justify-center gap-8">
        <BrandMarquee brands={brands} />
      </div>
    </section>
  );
};

export default BrandSection;
