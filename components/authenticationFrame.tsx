import { DarkLogo } from "@/assets/imageIndex";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AuthenticationProps = {
  children: React.ReactNode;
  title: string;
  subText: string;
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AuthenticationFrame = ({
  children,
  subText,
  title,
}: AuthenticationProps) => {
  return (
    <div
      className={`h-[100vh] w-[100vw] bg-[linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/heroImage.jpg')] bg-cover bg-center flex justify-center ${poppins.className}`}
    >
      <div className="bg-white max-w-[550px] max-h-[100vh] w-full  m-auto p-6 shadow-lg rounded-[8px] text-[#23292E] ">
        <div className="mx-auto flex items-center justify-center flex-col gap-2 mb-6">
          <Link href="/">
            <Image src={DarkLogo} alt="dark logo" />
          </Link>
          <p className="font-bold text-2xl leading-8">{title}</p>
          <p className="text-[#45535F] leading-[130%]">{subText}</p>
        </div>
        <div> {children}</div>
      </div>
    </div>
  );
};

export default AuthenticationFrame;
