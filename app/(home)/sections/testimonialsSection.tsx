import {
  AccordionTrigger,
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import React, { JSX } from "react";

export const TestimonialsSection = (): JSX.Element => {
  const faqItems = [
    {
      question: "Are the listed sellers verified?",
      answer:
        "Absolutely. All car vendors on our platform go through a strict verification process to ensure a safe and trustworthy experience.",
    },
    {
      question: "How long does it take to get loan approval?",
      answer: "",
    },
    {
      question: "Can I track my purchase and loan status?",
      answer: "",
    },
    {
      question: "Can I buy a car without applying for a loan?",
      answer: "",
    },
    {
      question: "How do I apply for a car loan on the platform?",
      answer: "",
    },
  ];

  return (
    <section className="flex flex-col w-full items-center gap-10 py-16">
      <div className="flex flex-col max-w-[720px] items-center gap-5">
        <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 border-l-[3px] border-l-[#007aff]">
          <h2 className="[font-family:'DM_Sans',Helvetica] font-semibold text-black text-[32px] leading-6">
            We&apos;ve Got Answers
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2.5 p-2.5 w-full">
          <p className="[font-family:'DM_Sans',Helvetica] font-normal text-[#575757] text-2xl leading-6">
            Find Quick Answers to Your Most Common Questions.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[920px]">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="border-b border-[#007aff33] px-2.5 py-5"
            >
              <AccordionTrigger className="flex justify-between">
                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-black text-2xl leading-6 text-left">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="[font-family:'DM_Sans',Helvetica] font-normal text-[#808080] text-xl leading-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
