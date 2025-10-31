import VehicleDetailsClient from "./_components/detailsClient";

export const metadata = {
  title: "Vehicle Details | Wheels",
  description: "View details for vehicles on Wheels.",
  openGraph: {
    title: "Vehicle Details | Wheels",
    description: "View details for vehicles on Wheels.",
  },
  twitter: {
    title: "Vehicle Details | Wheels",
    description: "View details for vehicles on Wheels.",
  },
};          

export default function VehicleDetails() {
  return <VehicleDetailsClient />;
}
