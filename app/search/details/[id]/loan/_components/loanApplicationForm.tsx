import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import DocumentUpload from "@/components/ui/documentUpload";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface FormSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

function FormSection({ title, children }: Readonly<FormSectionProps>) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <button
        type="button"
        className="w-full text-left flex justify-between items-center mb-6 focus:outline-none"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-[#353D45]">{title}</span>
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-gray-600 font-bold transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4201 5.53166L6.6001 0.783324C7.3801 0.0683241 8.6401 0.0683241 9.4201 0.783324L14.6001 5.53166C15.8601 6.68666 14.9601 8.66666 13.1801 8.66666H2.8201C1.0401 8.66666 0.160103 6.68666 1.4201 5.53166Z"
              fill="#3C4750"
            />
          </svg>
        </span>
      </button>
      {isOpen && children}
    </div>
  );
}

export interface LoanApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  dob: Date | null;
  address: string;
  employmentStatus: string;
  jobTitle: string;
  employerName: string;
  timeWithEmployer: string;
  annualIncome: string;
  monthlyExpense: string;
  loanAmount: string;
  loanTerm: string;
  confirmAccurate: boolean;
  authorizeCheck: boolean;
  acceptTerms: boolean;
}

interface LoanApplicationFormProps {
  onProceed: (formData: LoanApplicationFormData) => void;
  onBack?: () => void;
  onSaveDraft: () => void;
}

export default function LoanApplicationForm({
  onProceed,
  onSaveDraft,
}: LoanApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    nationalId: "",
    dob: null,
    address: "",
    employmentStatus: "",
    jobTitle: "",
    employerName: "",
    timeWithEmployer: "",
    annualIncome: "",
    monthlyExpense: "",
    loanAmount: "730,383.00",
    loanTerm: "3 Years",
    confirmAccurate: false,
    authorizeCheck: false,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const requiredFields: Array<
      [keyof LoanApplicationFormData, string, (value: unknown) => boolean]
    > = [
      [
        "fullName",
        "Full name is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "phone",
        "Phone number is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "email",
        "Email is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "nationalId",
        "National ID is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "dob",
        "Date of birth is required.",
        (v) => v !== null && v !== undefined,
      ],
      [
        "address",
        "Address is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "employmentStatus",
        "Employment status is required.",
        (v) => typeof v === "string" && !!v,
      ],
      [
        "jobTitle",
        "Job title is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "employerName",
        "Employer name is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "timeWithEmployer",
        "Time with employer is required.",
        (v) => typeof v === "string" && !!v,
      ],
      [
        "annualIncome",
        "Annual income is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "monthlyExpense",
        "Monthly expense is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "loanAmount",
        "Loan amount is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
      [
        "loanTerm",
        "Loan term is required.",
        (v) => typeof v === "string" && !!v.trim(),
      ],
    ];

    for (const [field, message, validator] of requiredFields) {
      if (!validator(formData[field])) {
        newErrors[field] = message;
      }
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.confirmAccurate)
      newErrors.confirmAccurate = "You must confirm details are accurate.";
    if (!formData.authorizeCheck)
      newErrors.authorizeCheck = "You must authorize credit check.";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept terms.";

    return newErrors;
  };

  const handleChange = (
    field: keyof LoanApplicationFormData,
    value: string | Date | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCheckboxChange = (
    field: keyof LoanApplicationFormData,
    checked: boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onProceed(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <FormSection title="Personal Information">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full ">
            <Label className="text-[#45535F]" htmlFor="fullName">
              Full Name
            </Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            {errors.fullName && (
              <span className="text-red-500 text-xs">{errors.fullName}</span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label className="text-[#45535F]" htmlFor="phone">
              Phone Number
            </Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="phone"
              type="tel"
              placeholder="+233 55 123 4567"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone}</span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label className="text-[#45535F]" htmlFor="email">
              Email
            </Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label className="text-[#45535F]" htmlFor="nationalId">
              National ID
            </Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="nationalId"
              placeholder="GHA-123456789-0"
              value={formData.nationalId}
              onChange={(e) => handleChange("nationalId", e.target.value)}
            />
            {errors.nationalId && (
              <span className="text-red-500 text-xs">{errors.nationalId}</span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label className="text-[#45535F]" htmlFor="dob">
              Date of Birth
            </Label>
            {errors.dob && (
              <span className="text-red-500 text-xs">{errors.dob}</span>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal block"
                  child={
                    <div className="flex items-center w-full justify-between px-2">
                      <span
                        className={formData.dob ? "" : "text-muted-foreground"}
                      >
                        {formData.dob
                          ? format(formData.dob, "PPP")
                          : "Pick a date"}
                      </span>
                      <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                    </div>
                  }
                ></Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  value={formData.dob}
                  onSelect={(date: Date | undefined) =>
                    handleChange("dob", date ?? null)
                  }
                  className=""
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2 w-full text-[#45535F]">
            <Label htmlFor="address">Address</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="address"
              placeholder="123 Main St, Accra"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && (
              <span className="text-red-500 text-xs">{errors.address}</span>
            )}
          </div>
        </div>
      </FormSection>

      {/* Employment & Financial Information */}
      <FormSection title="Employment & Financial Information">
        <div className="grid md:grid-cols-2 gap-6 text-[#45535F]">
          <div className="space-y-2 w-full">
            <Label htmlFor="employmentStatus">Employment Status</Label>
            {errors.employmentStatus && (
              <span className="text-red-500 text-xs">
                {errors.employmentStatus}
              </span>
            )}
            <Select
              value={formData.employmentStatus}
              onValueChange={(v) => handleChange("employmentStatus", v)}
            >
              <SelectTrigger className="w-full" id="employmentStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="jobTitle"
              placeholder="Software Engineer"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
            />
            {errors.jobTitle && (
              <span className="text-red-500 text-xs">{errors.jobTitle}</span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="employerName">Employer Name</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="employerName"
              placeholder="Tech Corp"
              value={formData.employerName}
              onChange={(e) => handleChange("employerName", e.target.value)}
            />
            {errors.employerName && (
              <span className="text-red-500 text-xs">
                {errors.employerName}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeWithEmployer">Time with Employer</Label>
            {errors.timeWithEmployer && (
              <span className="text-red-500 text-xs">
                {errors.timeWithEmployer}
              </span>
            )}
            <Select
              value={formData.timeWithEmployer}
              onValueChange={(v) => handleChange("timeWithEmployer", v)}
            >
              <SelectTrigger className="w-full" id="timeWithEmployer">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<1">Less than 1 year</SelectItem>
                <SelectItem value="1-3">1 - 3 years</SelectItem>
                <SelectItem value="3-5">3 - 5 years</SelectItem>
                <SelectItem value=">5">More than 5 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="annualIncome">Annual Income (GH₵)</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="annualIncome"
              type="number"
              placeholder="60000"
              value={formData.annualIncome}
              onChange={(e) => handleChange("annualIncome", e.target.value)}
            />
            {errors.annualIncome && (
              <span className="text-red-500 text-xs">
                {errors.annualIncome}
              </span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="monthlyExpense">Monthly Expense (GH₵)</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="monthlyExpense"
              type="number"
              placeholder="2500"
              value={formData.monthlyExpense}
              onChange={(e) => handleChange("monthlyExpense", e.target.value)}
            />
            {errors.monthlyExpense && (
              <span className="text-red-500 text-xs">
                {errors.monthlyExpense}
              </span>
            )}
          </div>
          <div className="space-y-2 w-full ">
            <Label htmlFor="loanAmount">Requested Loan Amount (GH₵)</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="loanAmount"
              value={formData.loanAmount}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
            />
            {errors.loanAmount && (
              <span className="text-red-500 text-xs">{errors.loanAmount}</span>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="loanTerm">Loan Term</Label>
            <Input
              defaultMaxWidth={false}
              className="w-full border border-[#D6DCE1]"
              id="loanTerm"
              value={formData.loanTerm}
              onChange={(e) => handleChange("loanTerm", e.target.value)}
            />
            {errors.loanTerm && (
              <span className="text-red-500 text-xs">{errors.loanTerm}</span>
            )}
          </div>
        </div>
      </FormSection>

      {/* Required Documents */}
      <FormSection title="Required Documents">
        <div className="grid md:grid-cols-3 gap-6">
          <DocumentUpload title="Driver's license (front & back)" required />
          <DocumentUpload title="Proof of Income" required />
          <DocumentUpload title="Bank statement" required />
        </div>
      </FormSection>

      <div className="bg-white text-[#45535F] rounded-lg border border-gray-200 p-8 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmAccurate"
              checked={formData.confirmAccurate}
              onCheckedChange={(c) =>
                handleCheckboxChange(
                  "confirmAccurate",
                  typeof c === "boolean" ? c : false
                )
              }
            />
            <Label htmlFor="confirmAccurate">
              I confirm all details provided are accurate
            </Label>
            {errors.confirmAccurate && (
              <span className="text-red-500 text-xs">
                {errors.confirmAccurate}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="authorizeCheck"
              checked={formData.authorizeCheck}
              onCheckedChange={(c) =>
                handleCheckboxChange(
                  "authorizeCheck",
                  typeof c === "boolean" ? c : false
                )
              }
            />
            <Label htmlFor="authorizeCheck">
              I authorize GCB to perform a credit check
            </Label>
            {errors.authorizeCheck && (
              <span className="text-red-500 text-xs">
                {errors.authorizeCheck}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(c) =>
                handleCheckboxChange(
                  "acceptTerms",
                  typeof c === "boolean" ? c : false
                )
              }
            />
            <Label htmlFor="acceptTerms">I accept the</Label>
            <button
              type="button"
              className="text-blue-600 hover:underline ml-1 p-0 bg-transparent border-none cursor-pointer"
              aria-label="View terms and conditions"
              onClick={() => {
                /* TODO: open terms modal or link */
              }}
            >
              terms and conditions
            </button>
            {errors.acceptTerms && (
              <span className="text-red-500 text-xs">{errors.acceptTerms}</span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-[#2D7EF8] hover:bg-[#1E6FE8] text-white px-8"
            disabled={
              !formData.confirmAccurate ||
              !formData.authorizeCheck ||
              !formData.acceptTerms
            }
            child="Submit Application"
          ></Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            child=" Save Draft Application"
          ></Button>
        </div>
      </div>
    </form>
  );
}
