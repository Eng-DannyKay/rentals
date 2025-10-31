"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import z from "zod";
import { phoneNumberSchema } from "@/schemas/zod.schemas";
import { ISignIn } from "@/types/auth.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MODE } from "@/constants/constants";
import { useAppDispatch } from "@/lib/hooks";
import { signIn } from "@/lib/features/auth/authThunk";
import { showErrorToast } from "@/lib/utils";
import { toast, ToastT } from "sonner";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const signInSchema = z.object({
    phoneNumber: phoneNumberSchema,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignIn>({
    resolver: zodResolver(signInSchema),
    mode: MODE.ON_TOUCH,
  });

  async function onSubmit({ phoneNumber }: ISignIn) {
    setIsLoading(true);
    const payload = await dispatch(signIn( phoneNumber)).unwrap();

    if (!showErrorToast(payload)) {
      toast.success(String(payload));
      reset();
      // Store the current route before navigating to verify
      sessionStorage.setItem('previousRoute', '/sign-in');
      router.push("/verify");
    } else {
      const errorResponse = payload as Partial<ToastT>;
      toast.error(errorResponse.description);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelName="Phone Number"
          placeholder="+233456789045"
          className="w-full text-sm h-10 focus:border-1 leading-[130%] "
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Button
          type="submit"
          className="mt-6 w-full h-11 font-normal"
          child="Sign In"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
        />
      </form>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
