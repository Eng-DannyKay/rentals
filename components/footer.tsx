'use client'
import { DiagonalLink, Logo } from "@/assets/imageIndex";
import { Button } from "@/components/ui/button";
import { useExemptedPath } from "@/hooks/useExemptedPath";
import Image from "next/image";
import React, { JSX } from "react";

export const Footer = (): JSX.Element => {
  const footerLinks = [
    { title: "About Us" },
    { title: "Contact" },
    { title: "Privacy Policy" },
    { title: "Terms of Service" },
  ];
  const {isPathExempted } = useExemptedPath()

  return (
    <>
      {!isPathExempted && (
        <footer className="flex flex-col  w-full items-center gap-16 py-10 bg-[url('/footerbg.png')] bg-cover bg-center">
          {/* Logo section */}
          <div className="flex items-center gap-2.5 justify-center">
            <Image
              src={Logo}
              className="md:w-[112.94px] md:h-[112.94px]"
              alt="Letter e"
            />
            <div className=" relative ">
              <div className=" text-2xl md:text-[75.3px]  font-medium text-white [font-family:'DM_Sans',Helvetica] tracking-[0]">
                Heels
              </div>
            </div>
          </div>

          {/* Call to action section */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h2 className="font-medium text-white text-2xl md:text-[40px] text-center tracking-[0] leading-[38.7px] [font-family:'DM_Sans',Helvetica]">
              Ready to get started?
            </h2>
            <p className="font-normal text-white md:text-2xl text-center tracking-[0] leading-[38.7px] [font-family:'DM_Sans',Helvetica]">
              Join thousands of users already using Wheels for their automotive
              needs
            </p>
            <Button
              variant="outline"
              className="h-10 bg-[#fff8e8] rounded-lg border-none"
              child={
                <>
                  <span className="font-medium text-primary text-[15px] tracking-[0] leading-[27.8px] [font-family:'DM_Sans',Helvetica]">
                    Create Account
                  </span>
                  <Image src={DiagonalLink} alt="Diagonal Link" />
                </>
              }
            ></Button>
          </div>

          {/* Footer links and copyright */}
          <div className="flex flex-col items-start gap-6 p-4 w-full">
            <div className="flex flex-wrap justify-center gap-[24px_40px] w-full">
              {footerLinks.map((link, index) => (
                <div key={index} className="flex flex-col w-40 items-center">
                  <a
                    href="#"
                    className="font-normal text-center leading-6 text-white text-base tracking-[0] [font-family:'DM_Sans',Helvetica]"
                  >
                    {link.title}
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center w-full">
              <p className="font-normal text-white text-base text-center tracking-[0] leading-6 [font-family:'DM_Sans',Helvetica]">
                © 2025 Wheels. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};
