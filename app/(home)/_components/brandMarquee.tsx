import Image from "next/image";

export default function BrandMarquee({
  brands,
}: {
    brands: { id: number; name: string; image: string }[];
}) {
  return (
    <div className="w-full overflow-hidden h-[131px] mt-6 relative group">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex gap-8 whitespace-nowrap animate-marquee group-hover:paused">
        {[...brands, ...brands, ...brands].map(({ id, name, image }, index) => (
          <div
            key={`${id}-${index}`}
            className="flex items-center justify-center flex-shrink-0"
          >
            <Image src={image} alt={name} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
