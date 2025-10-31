import React from 'react';
import { Check } from 'lucide-react';

interface StepProps {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  totalSteps: number;
}

type StepperProps = {
  currentStep?: number;
};

function Step({ number, label, isActive, isCompleted, totalSteps }: Readonly<StepProps>) {
  return (
    <div className="flex w-full items-center ">
      <div className="flex flex-col items-center mr-2">
       
        {(() => {
          let stepClass = '';
          if (isCompleted) {
            stepClass = 'bg-[#28A745]  text-white';
          } else if (isActive) {
            stepClass = 'bg-[#889BA8]  text-[#ffffff]';
          } else {
            stepClass = 'bg-[#FFFFFF]  text-[#45535F] border-2 border-[#889BA8]';
          }
          return (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${stepClass}`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : number}
            </div>
          );
        })()}
        {number === 1 && (
          <p className="text-xs text-[#A0AEC0] mt-1">Step {isActive ? number : 2}/3</p>
        )}
      </div>
      <div className="flex flex-col">
        <span className={`text-sm font-medium  ${isActive ? 'text-gray-900' : 'text-[#4A5568]'}`}>{label}</span>
      </div>
      {/* Progress bar between steps */}
      {number !== totalSteps && (
        <div className="flex-1 px-4">
          <div className={`h-2 rounded-full ${isCompleted ? 'bg-[#28A745]' : 'bg-[#E6EAF3]'}`}
            style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default function Stepper({ currentStep = 1 }: Readonly<StepperProps>) {
  const steps = [
    { number: 1, label: 'Bank Information' },
    { number: 2, label: 'Loan Form' },
    { number: 3, label: 'Complete Application' },
  ];
  const totalSteps = steps.length;

  // Mobile & tablet version (strictly as attached design)
  const currentStepObj = steps[currentStep - 1];
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <>
      {/* Mobile & tablet */}
      <div className="w-full  mb-6 pt-6 px-2 md:hidden">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#28A745] flex items-center justify-center mr-2">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-[#45535F] text-sm mr-2">{currentStepObj.label}</span>
          </div>
          <div className="flex-1 mx-2">
            <div className="h-2 rounded-full bg-[#E6EAF3] w-full relative">
              <div
                className="h-2 rounded-full bg-[#28A745] absolute top-0 left-0"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-[#A0AEC0] ml-2">Step {currentStep}/3</span>
        </div>
      </div>

      {/* Desktop version */}
      <div className="w-full mb-8 pt-8 hidden md:flex">
        <div className="flex items-center w-full">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              label={step.label}
              isActive={currentStep === step.number}
              isCompleted={currentStep > step.number}
              totalSteps={totalSteps}
            />
          ))}
        </div>
      </div>
    </>
  );
}