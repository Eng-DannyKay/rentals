import { Camaro } from "@/assets/imageIndex";
import { Application } from "@/types/loan.interface";
import { ToastStatus } from "@/types/shared.enum";
import { clsx, type ClassValue } from "clsx";
import { ApiError } from "next/dist/server/api-utils";
import { ToastT } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



/**
 * Creates a URL for a given page name.
 * @param {string} pageName - The name of the page to link to.
 * @returns {string} The URL for the page.
 */
export const createPageUrl = (pageName: string) => {
  if (!pageName) {
    console.error("createPageUrl: pageName is required");
    return "/";
  }
  return `/${pageName}`;
};

/**
 * Used to tell if we need to show a toast for the error based on the axiosErrorHandler function
 * @param payload - The payload from the axiosErrorHandler function
 */
export const showErrorToast = (payload: unknown): boolean =>
  (payload as ToastT).title === ToastStatus.Error;

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }
    if ("description" in error && typeof error.description === "string") {
      return error.description;
    }
  }

  return "An unexpected error occurred";
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
};

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "001",
    status: "Approved",
    submittedDate: "Jan 5, 2025",
    vehicle: {
      name: "Hyundai 2019",
      condition: "New",
      status: "Available",
      vin: "2345678B096542134",
      price: 68000,
      priceType: "Negotiable",
      image: Camaro,
    },
    bank: {
      name: "GCB Bank",
      swiftCode: "08785",
    },
  },
  {
    id: "002",
    status: "Under Review",
    submittedDate: "Jan 13, 2025",
    vehicle: {
      name: "Hyundai 2019",
      condition: "New",
      status: "Available",
      vin: "2345678B096542134",
      price: 68000,
      priceType: "Negotiable",
      image: Camaro,
    },
    bank: {
      name: "GCB Bank",
      swiftCode: "08785",
    },
  },
  {
    id: "003",
    status: "Draft",
    submittedDate: "Feb 9, 2025",
    vehicle: {
      name: "Hyundai 2019",
      condition: "New",
      status: "Available",
      vin: "2345678B096542134",
      price: 68000,
      priceType: "Negotiable",
      image: Camaro,
    },
    bank: {
      name: "GCB Bank",
      swiftCode: "08785",
    },
  },
  {
    id: "004",
    status: "Rejected",
    submittedDate: "Feb 14, 2025",
    vehicle: {
      name: "Hyundai 2019",
      condition: "New",
      status: "Available",
      vin: "2345678B096542134",
      price: 68000,
      priceType: "Negotiable",
      image: Camaro,
    },
    bank: {
      name: "GCB Bank",
      swiftCode: "08785",
    },
  },
  {
    id: "005",
    status: "Submitted",
    submittedDate: "Feb 25, 2025",
    vehicle: {
      name: "Hyundai 2019",
      condition: "New",
      status: "Sold Out",
      vin: "2345678B096542134",
      price: 68000,
      priceType: "Negotiable",
      image: Camaro,
    },
    bank: {
      name: "GCB Bank",
      swiftCode: "08785",
    },
  },
];
