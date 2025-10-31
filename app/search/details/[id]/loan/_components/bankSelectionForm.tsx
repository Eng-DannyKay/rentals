"use client";

import { GCBIcon } from "@/assets/imageIndex";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../../../../../components/ui/button";

const banks = [
  "GCB Bank",
  "Ecobank Ghana",
  "Standard Chartered Bank",
  "Absa Bank Ghana",
  "Fidelity Bank Ghana",
  "Consolidated Bank Ghana",
  "Agricultural Development Bank",
  "National Investment Bank",
  "Prudential Bank",
  "Universal Merchant Bank",
];

const bankLogos = {
  "GCB Bank": GCBIcon,
  "Ecobank Ghana": GCBIcon,
  // Add other bank logos here
};

interface BankSelectionFormProps {
  readonly onProceed: (selectedBank: string) => void;
}

function BankSelectionForm({ onProceed }: BankSelectionFormProps) {
  const [selectedBank, setSelectedBank] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedBank) {
      onProceed(selectedBank);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="bank" className="text-sm font-medium text-gray-900">
          Select Your Bank
        </Label>
        <Select value={selectedBank} onValueChange={setSelectedBank}>
          <SelectTrigger id="bank" className="w-full md:w-96">
            <SelectValue placeholder="GCB" />
          </SelectTrigger>
          <SelectContent>
            {banks.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="bg-[#2D7EF8] hover:bg-[#1E6FE8] text-white px-8 py-6 text-base rounded-lg"
        disabled={!selectedBank}
        child={
          <>
            {" "}
            Proceed
            <ChevronRight className="w-5 h-5 ml-2" />
          </>
        }
      ></Button>
    </form>
  );
}

interface SelectedBankCardProps {
  logoUrl?: string;
  name: string;
    swiftCode: string;
}

function SelectedBankCard(bankData: SelectedBankCardProps) {
  const logoUrl = bankLogos[bankData.name as keyof typeof bankLogos];
  const width = 126;
  const height = 126;

  return (
    <Card className="border-gray-200 shadow-sm w-full">
      <CardContent className="flex flex-col gap-2 w-full">
        <h3 className="text-sm font-semibold text-[#1E5D2D] ">Selected Bank</h3>
        <div className="flex flex-col sm:flex-row md:flex-row gap-2">
          <div className="w-full sm:w-[100px] md:w-[126px] h-[180px] sm:h-[100px] md:h-[126px] rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src={logoUrl}
              alt={`${bankData.name} logo`}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-[#45535F]">{bankData.name}</p>
            <p>Sort Code: <span className="font-bold text-[#45535F]">{bankData.swiftCode}</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { BankSelectionForm, SelectedBankCard };
