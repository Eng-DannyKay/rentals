import VehicleDetailsClient from "./_components/detailsClient";

export const metadata = {
  title: "Vehicle Details | rentals",
  description: "View details for vehicles on rentals.",
  openGraph: {
    title: "Vehicle Details | rentals",
    description: "View details for vehicles on rentals.",
  },
  twitter: {
    title: "Vehicle Details | rentals",
    description: "View details for vehicles on rentals.",
  },
};          

export default function VehicleDetails() {
  return <VehicleDetailsClient />;
}
