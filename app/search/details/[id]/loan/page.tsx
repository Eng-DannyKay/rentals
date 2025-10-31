"use client";

import { Camaro } from "@/assets/imageIndex";
import ApplicationComplete from "@/components/applicationComplete";
import Breadcrumb from "@/components/ui/breadcrumb";
import Stepper from "@/components/ui/stepper";
import VehicleSummaryCard from "@/components/ui/vehicleSummaryCard";
import { useState } from "react";
import {
  BankSelectionForm,
  SelectedBankCard,
} from "./_components/bankSelectionForm";
import LoanApplicationForm, {
  LoanApplicationFormData,
} from "./_components/loanApplicationForm";

import { useRouter } from "next/navigation";

export default function LoanApplication() {
  const router = useRouter();
  const vehicleData = {
    image: Camaro,
    name: "Sample Car",
    condition: "New" as const,
    status: "Available" as const,
    vin: "ABC123XYZ456",
    priceType: "Fixed",
    price: 85000,
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [showCompletion, setShowCompletion] = useState(false);

  const [applicationData, setApplicationData] = useState<{
    bank: { name: string; swiftCode: string };
    loanDetails: LoanApplicationFormData | null;
  }>({
    bank: { name: "", swiftCode: "" },
    loanDetails: null,
  });

  const handleBankSelect = (bank: string) => {
    setApplicationData((prev) => ({ 
      ...prev, 
      bank: { name: bank, swiftCode: "08785" } // You can modify this to get the actual swift code
    }));
    setCurrentStep(2);
  };

  const handleLoanFormSubmit = (loanDetails: LoanApplicationFormData) => {
    setApplicationData((prev) => ({ ...prev, loanDetails }));
    setCurrentStep(3);
   setShowCompletion(true);
  };

  const handleBackToBank = () => {
    setCurrentStep(1);
  };

  const handleSaveDraft = () => {
    // Logic for saving draft application
    alert("Draft saved!");
  };

const handleCloseCompletion = () => {
  setShowCompletion(false);
  // Navigate to loans page to view applications
  router.push('/loans');
};

  return (
    <div className="min-h-screen bg-[#F8F9FA] ">
      <div className=" px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Search Cars", href: "/search" },
            { label: "Hyundai 2019" },
            { label: "Loan Application", active: true },
          ]}
        />

        {/* Stepper */}
        <Stepper currentStep={currentStep} />

        {/* Step 1: Bank Information */}
        {currentStep === 1 && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bank Information
              </h1>
              <p className="text-gray-600">
                Select the bank you&#39;re applying for a loan from
              </p>
            </div>

            <div className="mb-8">
              <VehicleSummaryCard vehicle={{ ...vehicleData }} />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Bank Information
              </h2>
              <BankSelectionForm onProceed={handleBankSelect} />
            </div>
          </div>
        )}

        {/* Step 2: Loan Form */}

        {(currentStep === 2 || currentStep === 3) && (
          <>
            <div>
              <div className="my-8 bg-[#FFFFFF] rounded-lg border border-gray-200 p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Loan Form
                </h1>
                <p className="text-gray-600">
                  Complete your loan application for your selected vehicle
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center bg-[#FFFFFF] gap-6 border-gray-200 p-6  shadow-sm rounded-sm mb-8">
                <div className="flex-1 w-full">
                  <VehicleSummaryCard vehicle={vehicleData} />
                </div>
                <div className="flex-1 w-full">
                  <SelectedBankCard
                  
                   name={applicationData.bank.name} swiftCode={applicationData.bank.swiftCode} />
                </div>
              </div>

              <LoanApplicationForm
                onProceed={handleLoanFormSubmit}
                onBack={handleBackToBank}
                onSaveDraft={handleSaveDraft}
              />
            </div>
            <ApplicationComplete
              open={showCompletion}
              onClose={handleCloseCompletion}
              applicationId="003" // or dynamic value
              bankName={applicationData.bank.name}
            />
          </>
        )}
      
      </div>
    </div>
  );
}
