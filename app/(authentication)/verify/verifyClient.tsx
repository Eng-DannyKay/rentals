'use client'
import { DarkLogo } from "@/assets/imageIndex";
import VerificationForm from "@/components/verificationForm";
import { selectOtpPrefix } from "@/lib/features/auth/authSelector";
import { useAppSelector } from "@/lib/hooks";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const VerifyClient = () => {
  const otpPrefix = useAppSelector(selectOtpPrefix);
  const [isFromSignIn, setIsFromSignIn] = useState(false);

  useEffect(() => {
    const previousRoute = sessionStorage.getItem('previousRoute');
    
    if (previousRoute) {
      const isSignInRoute = previousRoute.includes('/sign-in');
      setIsFromSignIn(isSignInRoute);
    } else {
      const referrer = document.referrer;
      const isSignInReferrer = referrer.includes('/sign-in');
      setIsFromSignIn(isSignInReferrer);
    }
  }, []);

  const getVerificationText = () => {
    if (isFromSignIn) {
      return "Enter the 4-digit code sent to your number with the prefix";
    }
    return "Enter the 4-digit code sent to your number with the prefix";
  };

  const getCompletionText = () => {
    if (isFromSignIn) {
      return "to complete your sign in process.";
    }
    return "to complete your registration.";
  };

  return (
    <div
      className={`flex justify-center items-center m-auto h-[100vh] ${poppins.className}  bg-[linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/heroImage.jpg')] bg-cover bg-center`}
    >
      <div className="max-w-[550px] min-h-[365px] rounded-[8px] shadow-sm w-full p-8 bg-white">
        <div className="mx-auto flex items-center justify-center flex-col gap-2 mb-6">
          <Image src={DarkLogo} alt="dark logo" />
          <p className="font-bold text-2xl leading-8 text-[#23292E]">
            Verify Your Account
          </p>
          <p className="text-[#45535F] leading-[130%] text-center">
            {getVerificationText()} <span className="font-bold">{otpPrefix}</span> {getCompletionText()}
          </p>
        </div>
        <VerificationForm />
      </div>
    </div>
  );
};

export default VerifyClient;
