import React, { JSX } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  BrowserIcon,
  DealerIcon,
  DownSpring,
  ProcessBackground,
  RegisterIcon,
  UpSpring,
} from "@/assets/imageIndex";

export const ServicesSection = (): JSX.Element => {
  // Service process steps data
  const processSteps = [
    {
      number: "01",
      title: "Secure Registration",
      description:
        "Quick sign-up with OTP and ID verification to keep your account safe",
      position: "left-0 top-0",
    },
    {
      number: "02",
      title: "Browse & Connect",
      description:
        "Explore cars, compare offers, and connect with trusted sellers.",
      position: "left-[490px] top-[162px]",
    },
    {
      number: "03",
      title: "Complete Purchase",
      description:
        "Easy payments, fast loan approvals, and smooth order completion",
      position: "left-[980px] top-[13px]",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-10 w-full relative py-16">
      <div className="flex flex-col items-center gap-5 max-w-[719px]">
        <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 border-l-[3px] border-l-primary">
          <h2 className="font-semibold text-[32px] leading-6 text-black font-['DM_Sans',Helvetica]">
            Our Process
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2.5 p-2.5 w-full">
          <p className="font-normal text-2xl leading-6 text-[#575757] font-['DM_Sans',Helvetica]">
            Effortless Car Buying and Financing, Designed with You in Mind.
          </p>
        </div>
      </div>

      <div
        className="relative w-full h-[1000px] lg:h-[719px] bg-cover xxl:h-[900px]"
        style={{ backgroundImage: `url('${ProcessBackground.src}')` }}
      >
        <div className="max-w-[1376px] h-[719px] bg-[url(/group-10.png)] bg-[100%_100%] mx-auto xxl:h-[900px]">
          <div className="relative w-full h-[449px] top-[73px] xxl:static xxl:top-0 xxl:h-auto">
            {/* Layout for screens >= 1380px */}
            <div className="hidden xxl:block relative w-full h-[449px] mt-[70px]">
              {processSteps.map((step, index) => (
                <Card
                  key={`step-${index}`}
                  className={`flex flex-col max-w-[376px] items-center justify-center gap-[29px] p-4 absolute ${step.position} rounded-2xl bg-[linear-gradient(270deg,rgba(64,95,242,1)_0%,rgba(37,55,140,1)_100%)] border-none`}
                >
                  <CardContent className="flex flex-col w-full items-center gap-[29px] p-0">
                    <div className="flex flex-col max-w-[235px] items-center gap-[25px]">
                      <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <div className="font-extrabold text-[40px] tracking-[-1.60px] leading-normal text-[#ffffffb2] font-['DM_Sans',Helvetica]">
                          {step.number}
                        </div>
                        <div className="font-semibold text-[19px] tracking-[-0.76px] leading-normal text-white font-['DM_Sans',Helvetica]">
                          {step.title}
                        </div>
                      </div>

                      <div className="relative w-[72px] h-[72px]">
                        {index === 0 && (
                          <div className="relative top-1.5">
                            <Image
                              className="absolute w-[72px] h-[72px] top-0 left-0"
                              alt="Vector"
                              src={RegisterIcon}
                            />
                          </div>
                        )}
                        {index === 1 && (
                          <div className="absolute w-[63px] h-10 top-2.5 left-1 bg-[100%_100%]">
                            <div className="top-[21px]">
                              <Image
                                className="absolute w-[72px] h-[72px] top-0"
                                alt="browser icon"
                                src={BrowserIcon}
                              />
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <Image
                            className="absolute w-[59px] h-[62px] top-1.5 left-1.5 "
                            alt="dealer icon"
                            src={DealerIcon}
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-[17px] tracking-[-0.68px] leading-normal text-white text-center font-medium font-['DM_Sans',Helvetica] [text-shadow:0px_2px_1px_#00000040] w-full">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Layout for screens < 1380px */}
            <div className="xxl:hidden flex flex-wrap justify-center gap-6 px-4 py-8">
              {processSteps.map((step, index) => (
                <Card
                  key={`step-mobile-${index}`}
                  className="flex flex-col max-w-[376px] items-center justify-center gap-[29px] p-4 rounded-2xl bg-[linear-gradient(270deg,rgba(64,95,242,1)_0%,rgba(37,55,140,1)_100%)] border-none"
                >
                  <CardContent className="flex flex-col w-full items-center gap-[29px] p-0">
                    <div className="flex flex-col max-w-[235px] items-center gap-[25px]">
                      <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <div className="font-extrabold text-[40px] tracking-[-1.60px] leading-normal text-[#ffffffb2] font-['DM_Sans',Helvetica]">
                          {step.number}
                        </div>
                        <div className="font-semibold text-[19px] tracking-[-0.76px] leading-normal text-white font-['DM_Sans',Helvetica]">
                          {step.title}
                        </div>
                      </div>

                      <div className="relative w-[72px] h-[72px]">
                        {index === 0 && (
                          <div className="relative top-1.5">
                            <Image
                              className="absolute w-[72px] h-[72px] top-0 left-0"
                              alt="Vector"
                              src={RegisterIcon}
                            />
                          </div>
                        )}
                        {index === 1 && (
                          <div className="absolute w-[63px] h-10 top-2.5 left-1 bg-[100%_100%]">
                            <div className="top-[21px]">
                              <Image
                                className="absolute w-[72px] h-[72px] top-0"
                                alt="browser icon"
                                src={BrowserIcon}
                              />
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <Image
                            className="absolute w-[59px] h-[62px] top-1.5 left-1.5"
                            alt="dealer icon"
                            src={DealerIcon}
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-[17px] tracking-[-0.68px] leading-normal text-white text-center font-medium font-['DM_Sans',Helvetica] [text-shadow:0px_2px_1px_#00000040] w-full">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connection arrows */}
      <Image
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[183px] h-[116px] ml-[-300px] mt-[150px] hidden-image-control"
        alt="Vector"
        src={DownSpring}
      />
      <Image
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[132px] mt-[200px] ml-[300px] hidden-image-control"
        alt="Vector"
        src={UpSpring}
      />
    </section>
  );
};
