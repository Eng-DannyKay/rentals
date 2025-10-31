import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./storeProvider";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "rentals",
  description:
    "From luxury to utility, we have the perfect ride for every journey. Your dream vehicle is just a call away.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning helps ignore extension-injected attrs (e.g., Grammarly) */}
      <body suppressHydrationWarning className={`${dmSans.variable} ${inter.variable} antialiased overflow-x-hidden`}>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
        <Toaster richColors  position="top-right"/>
      </body>
    </html>
  );
}
