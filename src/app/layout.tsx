import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { MobileGate } from "@/components/ui/MobileGate";
import "./globals.css";

const coolvetica = localFont({
  src: "../../public/fonts/Coolvetica-Light-Regular.otf",
  variable: "--font-headline",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Dera — AI Claims Middleware for Nigerian Insurance",
  description: "Dera connects Nigerian insurers to garages, adjusters, and towing partners in real time. Built for NIIRA 2025 compliance.",
  keywords: ["Insurance", "Claims", "Middleware", "Nigeria", "NIIRA 2025", "AI"],
  openGraph: {
    title: "Dera — AI Claims Middleware",
    description: "The Claims Backbone Nigerian Insurance Was Built Without.",
    type: "website",
    locale: "en_NG",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${coolvetica.variable} scroll-smooth`}>
      <body className="antialiased font-body">
        <MobileGate />
        {children}
      </body>
    </html>
  );
}
