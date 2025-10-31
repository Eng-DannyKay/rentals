import { DarkLogo } from "@/assets/imageIndex";
import Image from "next/image";
import { JSX } from "react";

export function Loader(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex h-36 w-36 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-r-4 border-[var(--dark-text)]"></div>
        <Image src={DarkLogo} alt="logo" className="h-18 w-18" />
      </div>
    </div>
  );
}
