"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import z from "zod";
import {
  emailSchema,
  nameSchema,
  phoneNumberSchema,
} from "@/schemas/zod.schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MODE } from "@/constants/constants";
import { ISignUp } from "@/types/auth.interface";
import { useAppDispatch } from "@/lib/hooks";
import { signUp } from "@/lib/features/auth/authThunk";
import { toast, ToastT } from "sonner";
import { showErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const signUpSchema = z.object({
    phoneNumber: phoneNumberSchema,
    name: nameSchema,
    email: emailSchema(false).nullable(),
    nationalId: z.string().nullable(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    mode: MODE.ON_TOUCH,
  });

  async function onSubmit({
    email,
    name,
    nationalId,
    phoneNumber,
  }: ISignUp): Promise<void> {
    setIsLoading(true);
    const { payload } = await dispatch(
      signUp({
        name,
        phoneNumber,
        email: email || null,
        nationalId: nationalId || null,
      })
    );

    if (!showErrorToast(payload)) {
      toast.success(String(payload));
      reset();
      sessionStorage.setItem('previousRoute', '/sign-up');
      router.push('/verify')
    } else {
      const errorResponse = payload as Partial<ToastT>;
      toast.error(errorResponse.description);
    }

    setIsLoading(false);
  }  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          labelName="Full Name"
          placeholder="Andrew Jay"
          className="w-full text-sm h-10 focus:border-1 leading-[130%] "
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          labelName="Phone Number"
          placeholder="+233456789045"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
        <Input
          labelName="Email (Optional)"
          placeholder="andrewjay@gmail.com"
          className="w-full text-sm h-10 focus:border-1 leading-[130%] "
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          labelName="National ID (Optional)"
          placeholder="GHA-8833 80900 090909"
          className="w-full text-sm h-10 focus:border-1 leading-[130%] "
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.nationalId?.message}
          {...register("nationalId")}
        />

        <div className="flex items-start space-x-3 justify-center mt-2">
          <Checkbox
            id="terms"
            className="mt-1 mx-3 border border-[var(--dark-text)]"
            checked={isPolicyChecked}
            onCheckedChange={(checked) => setIsPolicyChecked(checked === true)}
          />
          <label
            htmlFor="terms"
            className=" font-normal leading-[130%] text-gray-700 ml-1"
          >
            By signing up I agree to our{" "}
            <Link
              href="#"
              className="text-blue-600 underline underline-offset-2"
            >
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link
              href="#privacy"
              className="text-blue-600 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full h-11 font-normal"
          child="Sign Up"
          disabled={!(isPolicyChecked && isValid) || isLoading}
          isLoading={isLoading}
        />
      </form>
      <p className="text-center mt-2">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
