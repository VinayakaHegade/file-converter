import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convio - Free Unlimited File Converter",
  description: "One converter for all your needs.",
  creator: "Vinayka Hegde",
  keywords: [
    "image converter",
    "audio converter",
    "video converter",
    "unlimited video converter",
    "unlimited audio converter",
    "unlimited image converter",
    "best image converter free",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <div className="pt-32 min-h-screen lg:pt-36 2xl:pt-44 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl"></div>
      </body>
    </html>
  );
}
