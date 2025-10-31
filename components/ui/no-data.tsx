import React from "react";

interface EmptyProps {
  message?: string;
  className?: string;
}

const NoData: React.FC<EmptyProps> = ({
  message = "No data found.",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 sm:py-24 px-4 ${className}`}
    >
    
      <div className="relative mb-8 w-32 h-32 flex items-center justify-center">
      
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-2xl opacity-60" />


        <svg
          width="96"
          height="96"
          fill="none"
          viewBox="0 0 64 64"
          className="relative z-10"
        >
       
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#EFF6FF" />
            </linearGradient>
          </defs>

          <circle cx="32" cy="32" r="30" fill="url(#grad1)" />
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Empty folder lines */}
          <path
            d="M20 40h24M24 28v8m8-8v8m8-8v8"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Message text */}
      <div className="text-center max-w-sm">
        <p className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
          {message}
        </p>
        <p className="text-sm text-slate-500">
          Try adjusting your filters or search terms
        </p>
      </div>
    </div>
  );
};

export default NoData;