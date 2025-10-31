import VehicleDetailsClient from "./_components/detailsClient";

export const metadata = {
  title: "Vehicle Details | reantals",
  description: "View details for vehicles on reantals.",
  openGraph: {
    title: "Vehicle Details | reantals",
    description: "View details for vehicles on reantals.",
  },
  twitter: {
    title: "Vehicle Details | reantals",
    description: "View details for vehicles on reantals.",
  },
};          

export default function VehicleDetails() {
  return <VehicleDetailsClient />;
}
