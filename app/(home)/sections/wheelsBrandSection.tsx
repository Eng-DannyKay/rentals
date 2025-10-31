import React from "react";
import { LogoWithText, StarShape } from "@/assets/imageIndex";
import Image from "next/image";
import { cn } from "@/lib/utils";

const WheelsBrandSection = () => {
  const wheelLogo = [
    { id: 1, name: "logo", image: LogoWithText },
    { id: 2, name: "star", image: StarShape },
    { id: 1, name: "logo", image: LogoWithText },
    { id: 2, name: "star", image: StarShape },
    { id: 1, name: "logo", image: LogoWithText },
    { id: 2, name: "star", image: StarShape },
    { id: 1, name: "logo", image: LogoWithText },
    { id: 2, name: "star", image: StarShape },
  ];

  return (
    <div>
      <div className="w-full overflow-hidden h-[131px] mt-6 relative  ">
        <div
          className="flex gap-8 whitespace-nowrap  bg-[#cbcbcb]
         h-[110px]"
        >
          {[...wheelLogo, ...wheelLogo, ...wheelLogo].map(
            ({ id, name, image }, index) => (
              <div
                key={`${id}-${index}`}
                className="flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={image}
                  alt={name}
                  className={cn(name === "logo" && "w-[200px]")}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WheelsBrandSection;
