import {
  CarVendorIcon,
  checkedIcon,
  CustomerIcon,
  FinancialIcon,
} from "@/assets/imageIndex";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import React, { JSX } from "react";

export const CallToActionSection = (): JSX.Element => {
  const userTypeCards = [
    {
      title: "Customer",
      description: "Browse and buy vehicles with flexible financing",
      icon: CustomerIcon,
      features: [
        "Browse available cars",
        "Apply for easy loans",
        "Make secure payments",
        "Track your order status",
      ],
    },
    {
      title: "Car vendor",
      description: "List, sell, and manage your vehicle inventory",
      icon: CarVendorIcon,
      features: [
        "Manage your listings",
        "Process and fulfill orders",
        "Communicate with buyers",
        "Access real-time sales insights",
      ],
    },
    {
      title: "Financial Institution",
      description: "Offer loans and manage financial services",
      icon: FinancialIcon,
      features: [
        "Review loan applications",
        "Conduct credit checks",
        "Manage approvals",
        "Handle risk and compliance",
      ],
    },
  ];

  return (
    <section className="flex flex-col w-full items-center gap-10 py-16">
      <div className="flex flex-col items-center gap-5">
        <div className="inline-flex items-center justify-center px-4 py-2.5 border-l-[3px] border-[#007aff]">
          <h2 className="font-semibold text-black text-[32px] leading-6 [font-family:'DM_Sans',Helvetica]">
            Who Are You? Tailored Dashboards for Every User
          </h2>
        </div>

        <div className="flex items-center justify-center p-2.5 w-full">
          <p className="font-normal text-[#575757] text-2xl leading-6 [font-family:'DM_Sans',Helvetica]">
            Access the tools, features, and dashboards designed for your
            specific needs
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-24 w-full">
        {userTypeCards.map(({ description, features, icon, title }, index) => (
          <Card
            key={`user-type-${index}`}
            className="flex flex-col w-[303px] items-center gap-2 pt-px pb-2.5 px-px rounded-3xl overflow-hidden bg-gradient-to-l from-[rgba(37,55,140,1)] to-[rgba(64,95,242,1)]"
          >
            <CardContent className="flex items-center gap-2.5 px-3 py-[55px] w-full h-[445px] bg-white rounded-3xl overflow-hidden">
              <div className="flex flex-col w-[277px] items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-2 py-2 w-full border-b border-transparent [border-image:linear-gradient(270deg,rgba(0,122,255,1)_0%,rgba(0,73,153,1)_100%)_1]">
                  <div className="flex flex-col w-[269px] items-center justify-center gap-2">
                    <div>
                      <Image src={icon} alt={`${index}`} />
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <h3 className="font-bold text-black text-base leading-6 [font-family:'DM_Sans',Helvetica]">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-full">
                    <p className="font-bold text-[#808080] text-sm text-center leading-5 [font-family:'DM_Sans',Helvetica]">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={`feature-${featureIndex}`}
                      className="flex items-center gap-2 w-full"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Image src={checkedIcon} alt="Checked Icon" />
                      </div>
                      <p className="font-medium text-black text-sm leading-5 [font-family:'DM_Sans',Helvetica]">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <div className="inline-flex items-center justify-center gap-2 text-white">
              <span className="font-medium text-base leading-[27.8px] [font-family:'DM_Sans',Helvetica]">
                Learn more
              </span>
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
