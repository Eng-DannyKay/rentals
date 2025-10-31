import { PromotionSlide } from "@/assets/imageIndex";
import React from "react";

const BestDealSection = () => {
  return (
    <div
      style={{ backgroundImage: `url('${PromotionSlide.src}')` }}
      className="h-[563px] bg-cover w-full"
    ></div>
  );
};

export default BestDealSection;
