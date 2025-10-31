import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  readonly images: readonly string[] | StaticImageData[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const processedImages = React.useMemo(() => {
    if (images.length === 0) return images;
    if (images.length >= 3) return images;
    
    const duplicatedImages = [...images];
    while (duplicatedImages.length < 3) {
      duplicatedImages.push(...images);
    }
    return duplicatedImages.slice(0, 3); 
  }, [images]);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? processedImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === processedImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="
        flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-4 md:gap-6
        bg-white dark:bg-gray-800
        p-4 rounded-sm border border-gray-200
      "
      style={{ height: "100%" }}
    >
      <div className="relative rounded-s overflow-hidden group shadow-sm w-full aspect-[4/3] lg:aspect-auto">
        <Image
          src={processedImages[selectedIndex]}
          alt="Vehicle"
          title={`Vehicle Image ${selectedIndex + 1}`}
          fill
          priority
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {processedImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              child={<ChevronLeft className="w-5 h-6 font-bold text-[#3C4750]" />}
              className="absolute left-2  bottom-1 -translate-y-1/2 bg-[#E6EAF3] hover:bg-white rounded-sm w-8 h-8 shadow-md opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              child={<ChevronRight className="w-5 h-6 font-bold text-[#3C4750]" />}
              className="absolute right-2  bottom-1 -translate-y-1/2 bg-[#E6EAF3] hover:bg-white rounded-sm w-8 h-8 shadow-md opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div
        className="
          flex lg:grid lg:grid-cols-1 gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible
          py-2 lg:py-0
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {processedImages.map((image, index) => {
          const key = typeof image === "string" ? image : JSON.stringify(image);

          return (
            <button
              key={`${key}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative aspect-[4/3] min-w-[90px] lg:min-w-0 rounded-sm overflow-hidden border-2 transition-all focus:outline-none",
                selectedIndex === index
                  ? "border-blue-600 shadow-sm"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={142}
                height={149}
                title={`Thumbnail ${index + 1}`}
                className={cn(
                  "object-cover w-full h-full transition-opacity duration-300",
                  selectedIndex === index ? "opacity-100" : "opacity-80"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
