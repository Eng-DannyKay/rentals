import React from "react";
import { Badge } from "./ui/badge";
import { ApplicationStatus } from "../types/loan.interface";
import { UnderReviewIcon } from "@/assets/imageIndex";
import { Check, CheckIcon, X } from "lucide-react";
import Image from "next/image";

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export interface ApplicationStatusConfigItem {
  badgeClass: string;
  iconBg?: string;
  icon?: React.ReactNode;
}

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  ApplicationStatusConfigItem
> = {
  Approved: {
    badgeClass:
      "bg-[#28A745] h-6 text-[#F1FCF2] font-normal px-3 py-0.5 rounded-full text-sm",
    iconBg: "bg-[#DFF9E4]",
    icon: <CheckIcon className="w-4 h-4 text-[#28A745]" />,
  },
  "Under Review": {
    badgeClass:
      "bg-[#FFFBC5] h-6 text-[#23292E] font-normal px-3 py-0.5 rounded-full text-sm",
    icon: (
      <Image
        src={UnderReviewIcon}
        width={16}
        height={16}
        alt="Under Review"
        className="w-4 h-4"
      />
    ),
  },
  Rejected: {
    badgeClass:
      "bg-[#FEE6E5] h-6 text-red-800 font-normal px-3 py-0.5 rounded-full text-sm",
    icon: <X className="w-3 h-3 text-[#99182C]" />,
  },
  Submitted: {
    badgeClass:
      "bg-[#DFF9E4] h-6 text-[#1E5D2D] font-normal px-3 py-0.5 rounded-full text-sm",
  },
  Available: {
    badgeClass:
      "bg-[#DFF9E4] h-6 text-[#1E5D2D] font-normal px-3 py-0.5 flex items-center rounded-full text-sm",
    icon: (
      <span className="w-3 h-3 bg-[#1E5D2D] text-white flex items-center justify-center rounded-full p-0.2">
        <Check />
      </span>
    ),
  },
  "Sold Out": {
    badgeClass:
      "bg-[#FEE6E5] h-6 text-red-800 font-normal px-3 py-0.5 rounded-full text-sm",
    icon: <X className="w-3 h-3 text-[#99182C]" />,
  },
  Draft: {
    badgeClass: "rounded-full h-6 bg-[#00000080]",
  },
};

const getApplicationStatusConfig = (
  status: ApplicationStatus
): ApplicationStatusConfigItem => {
  return APPLICATION_STATUS_CONFIG[status] ?? APPLICATION_STATUS_CONFIG.Draft;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
}) => {
  const config = getApplicationStatusConfig(status);

  let iconEl: React.ReactNode = null;
  if (config.iconBg) {
    iconEl = (
      <span className={`rounded-full w-4 h-4 ${config.iconBg}`}>
        {config.icon}
      </span>
    );
  } else if (config.icon) {
    iconEl = <span>{config.icon}</span>;
  }

  return (
    <Badge className={`${config.badgeClass} ${className ?? ""}`.trim()}>
      {iconEl}
      {status}
    </Badge>
  );
};

export default StatusBadge;
