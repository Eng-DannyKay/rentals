"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn, showErrorToast } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectExpiresAt,
  selectOtpPrefix,
} from "@/lib/features/auth/authSelector";
import { resendCode, verifyCode } from "@/lib/features/auth/authThunk";
import { toast, ToastT } from "sonner";
import { useRouter } from "next/navigation";

const VerificationForm = () => {
  const [authenticationInput, setAuthenticationInput] = useState<string[]>(
    new Array(4).fill("")
  );
  const [, setValidForm] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState<
    "none" | "valid" | "error"
  >("none");
  const [timeLeft, setTimeLeft] = useState("");
  const otpPrefix = useAppSelector(selectOtpPrefix);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    new Array(4).fill(null)
  );
  const expiresAt = useAppSelector(selectExpiresAt);
  const handleOnKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && index > 0) {
      const newAuthenticationInput: string[] = [...authenticationInput];
      newAuthenticationInput[index] = "";
      setAuthenticationInput(newAuthenticationInput);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOnChange = (
    index: number,
    { target }: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let { value } = target;
    setRequestStatus("none");
    value = value.replace(/[^A-Z0-9]/g, "");

    const newAuthenticationInput: string[] = [...authenticationInput];
    newAuthenticationInput[index] = value;

    if (value) {
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    setAuthenticationInput(newAuthenticationInput);

    if (newAuthenticationInput.every((digit) => digit.length === 1)) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

    const target = new Date(expiresAt).getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("");
        return;
      }

      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${minutes}m ${seconds}s`);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  async function handleVerifyCode() {
    setIsLoading(true);
    const { payload } = await dispatch(
      verifyCode({ code: authenticationInput.join(''), prefix: otpPrefix! })
    );

    if (!showErrorToast(payload)) {
      toast.success(String(payload));
      setRequestStatus("valid");
      router.push("/");
    } else {
      const errorResponse = payload as Partial<ToastT>;
      toast.error(errorResponse.description);
      setRequestStatus("error");
    }

    setIsLoading(false);
  }

  async function handleResend() {
      setResendLoading(true)   
    const payload = await dispatch(resendCode()).unwrap();

       if (!showErrorToast(payload)) {
         toast.success(String(payload));
       } else {
         const errorResponse = payload as Partial<ToastT>;
         toast.error(errorResponse.description);
         setRequestStatus("error");
    }
    
    setResendLoading(false)

  }

  return (
    <div className="">
      <div className="flex flex-wrap gap-2  max-w-[350px] mx-auto">
        {authenticationInput.map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              className={cn(
                `
                    rounded-lg 
                    border border-[#ECEFF2] 
                    h-[3.625rem] w-[3.625rem] 
                    text-[#45535F]
                    bg-[#F8F9FA]
                    text-center 
                    mx-auto 
                    flex justify-center items-center 
                    overflow-hidden
                    shadow-sm`,
                requestStatus === "valid" && "border-[#58D073]",
                requestStatus === "error" && "border-red-500"
              )}
              required
              onChange={(e) => handleOnChange(index, e)}
              onKeyDown={(e) => handleOnKeyDown(index, e)}
              value={authenticationInput[index]}
              maxLength={1}
            />
          </React.Fragment>
        ))}
      </div>
      <div className=" flex justify-center ">
        {expiresAt && !!timeLeft && (
          <p className="mt-2 -mb-4 ml-2 text-red-500">
            Code expires in: {timeLeft}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-6 w-full h-11 font-normal"
        child="Verify"
        disabled={authenticationInput.filter(Boolean).length < 4}
        isLoading={isLoading}
        onClick={handleVerifyCode}
      />
      <p className="text-center text-[#45535F] mt-6">
        Didn&apos;t receive OTP?
        <Button
          variant="ghost"
          child={"Resend"}
          className="text-primary font-normal text-base hover:text-primary -ml-1"
          disabled={!!timeLeft || resendLoading}
          onClick={handleResend}
          isLoading={resendLoading}
        />
      </p>
    </div>
  );
};

export default VerificationForm;
