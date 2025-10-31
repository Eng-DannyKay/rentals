import { StaticImageData } from "next/image";

export type ApplicationStatus = "Approved" | "Under Review" | "Draft" | "Rejected" | "Submitted"| "Available"| "Sold Out";
export type VehicleCondition = "New" | "Used";
export type VehicleStatus = "Available" | "Sold Out";
export type TabType = "submitted" | "draft";

export interface Vehicle {
  name: string;
  condition: VehicleCondition;
  status: VehicleStatus;
  vin: string;
  price: number;
  priceType: string;
  image: StaticImageData;
}

export interface Bank {
  name: string;
  swiftCode: string;
}

export interface Application {
  id: string;
  status: ApplicationStatus;
  submittedDate: string;
  vehicle: Vehicle;
  bank: Bank;
}