import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navigation from "@/components/navigation/navigation";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "px-6 md:px-12 max-w-7xl mx-auto")}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
