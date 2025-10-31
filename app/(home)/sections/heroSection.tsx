"use client";
import { LinkIcon } from "@/assets/imageIndex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px]  md:h-[700px] lg:h-[819px] bg-[linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/heroImage.jpg')] bg-cover bg-center">
      {/* New Feature Badge */}
      <div className="inline-flex items-center gap-2 sm:gap-3 pl-1 pr-2 py-1 absolute top-[120px] sm:top-[81px] md:top-[81px] left-4 sm:left-6 md:left-8 lg:left-10 bg-[#333333] rounded-[14px] overflow-hidden max-w-[calc(100%-2rem)] sm:max-w-none">
        <Badge className="bg-primary rounded-[10px] px-2 sm:px-3 py-0.5">
          <span className="[font-family:'Inter',Helvetica] font-medium text-white text-xs leading-[18px]">
            New
          </span>
        </Badge>
        <div className="inline-flex items-center gap-2">
          <span className="[font-family:'Inter',Helvetica] font-medium text-white text-xs sm:text-sm leading-[21px]">
            Advanced Loan Integration Available
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col max-w-[1360px] items-start gap-8 sm:gap-12 md:gap-16 lg:gap-[99px] absolute top-[160px] sm:top-[120px] md:top-[124px] left-4 sm:left-6 md:left-8 lg:left-10 right-4 sm:right-6 md:right-8 lg:right-auto">
        <div className="flex flex-col items-start gap-8 sm:gap-12 md:gap-16 lg:gap-[170px] w-full">
          <div className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 w-full">
            <h1 className="[font-family:'DM_Sans',Helvetica] font-bold text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl leading-tight sm:leading-tight md:leading-tight lg:leading-[94px] max-w-full">
              THE FUTURE OF CAR COMMERCE
            </h1>
            <p className="[font-family:'DM_Sans',Helvetica] font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl leading-5 sm:leading-6 md:leading-7 lg:leading-5 max-w-full lg:max-w-auto">
              Buy Smarter. Finance Easier. Connect Seamlessly—with Ghana&apos;s
              All-in-one Automotive Marketplace.
            </p>
          </div>

          <Button
            className="w-full sm:w-[160px] md:w-[170px] lg:w-[181px] h-12 sm:h-13 md:h-14 bg-primary rounded-lg gap-2 hover:bg-primary/90 transition-colors"
            child={
              <>
                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-white text-sm sm:text-[15px] text-center leading-[27.8px]">
                  Get Started
                </span>
                <Image
                  src={LinkIcon}
                  alt="Link"
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                />
              </>
            }
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
