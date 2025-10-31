"use client";
import { MODE } from "@/constants/constants";
import { showErrorToast } from "@/lib/utils";
import {
    emailSchema,
    nameSchema,
    phoneNumberSchema,
} from "@/schemas/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastT } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

interface IVendorSignUp {
  companyName: string;
  businessRegistrationId: string;
  businessEmail: string;
  businessPhoneNumber: string;
  contactPerson: string;
  contactPersonEmail: string;
}

const VendorSignUpForm = () => {
  const vendorSignUpSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    businessRegistrationId: z.string().min(1, "Business registration ID is required"),
    businessEmail: emailSchema(true),
    businessPhoneNumber: phoneNumberSchema,
    contactPerson: nameSchema,
    contactPersonEmail: emailSchema(true),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IVendorSignUp>({
    resolver: zodResolver(vendorSignUpSchema),
    mode: MODE.ON_TOUCH,
  });

  async function onSubmit(data: IVendorSignUp): Promise<void> {
    setIsLoading(true);
    
   console.log('Vendor Sign Up Data:', data);

    if (!showErrorToast("")) {
      toast.success(String("Vendor sign-up successful!"));
      reset();
      sessionStorage.setItem('previousRoute', '/sign-up');
      router.push('/verify');
    } else {
      const errorResponse = "" as Partial<ToastT>;
      toast.error(errorResponse.description);
    }

    setIsLoading(false);
  }

  return (
    <div className="h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          labelName="Company Name"
          placeholder="Ghana Commercial Bank"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.companyName?.message}
          {...register("companyName")}
        />
        
        <Input
          labelName="Business Registration ID"
          placeholder="45678934355434343"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.businessRegistrationId?.message}
          {...register("businessRegistrationId")}
        />
        
        <Input
          labelName="Business Email"
          placeholder="contact@autodriveghana.com"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.businessEmail?.message}
          {...register("businessEmail")}
        />
        
        <Input
          labelName="Business Phone Number"
          placeholder="+233 30 456 7895"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.businessPhoneNumber?.message}
          {...register("businessPhoneNumber")}
        />
        
        <Input
          labelName="Contact Person"
          placeholder="Andrew Jay"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.contactPerson?.message}
          {...register("contactPerson")}
        />
        
        <Input
          labelName="Contact Person's Email"
          placeholder="andrew.jay@gcbbank.com"
          className="w-full text-sm h-10 focus:border-1 leading-[130%]"
          defaultMaxWidth={false}
          labelClassName="font-semibold text-[var(--dark-text)]"
          wrapperClassName="gap-[6px]"
          error={errors.contactPersonEmail?.message}
          {...register("contactPersonEmail")}
        />

        <div className="flex items-start space-x-3 justify-start mt-2">
          <Checkbox
            id="terms"
            className="mt-1 border border-[var(--dark-text)]"
            checked={isPolicyChecked}
            onCheckedChange={(checked) => setIsPolicyChecked(checked === true)}
          />
          <label
            htmlFor="terms"
            className="font-normal leading-[130%] text-gray-700 text-sm"
          >
            By signing up I agree to the{" "}
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

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Or Sign Up With</p>
      </div>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default VendorSignUpForm;