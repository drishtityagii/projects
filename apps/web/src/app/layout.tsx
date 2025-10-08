import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import "./styles/clerk.css";
import React from "react";

export const metadata: Metadata = {
  title: 'Layers',
  description: 'Wtv for now',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-serif bg-[#FFF6F8] text-[#1f2937] antialiased">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}