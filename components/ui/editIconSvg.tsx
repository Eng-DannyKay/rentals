import React, { forwardRef } from "react";

export type LuciEditIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
  title?: string;
};

const EditIconSVG = forwardRef<SVGSVGElement, LuciEditIconProps>(
  ({ size = 18, title, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M15.41 1.795L14.2 0.585C13.42 -0.195 12.15 -0.195 11.37 0.585L8.69 3.265L0 11.955V15.995H4.04L12.78 7.255L15.41 4.625C16.2 3.845 16.2 2.575 15.41 1.795ZM3.21 13.995H2V12.785L10.66 4.125L11.87 5.335L3.21 13.995ZM8 15.995L12 11.995H18V15.995H8Z"
        fill="currentColor"
      />
    </svg>
  )
);

EditIconSVG.displayName = "EditIconSVG";

export default EditIconSVG;
