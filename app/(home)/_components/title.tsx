import React from "react";

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 border-l-[3px] border-l-[#007aff]">
      <h2 className="relative w-fit mt-[-3.00px] font-['DM_Sans',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-6 whitespace-nowrap">
        {title}
      </h2>
    </div>
  );
};

export default Title;
