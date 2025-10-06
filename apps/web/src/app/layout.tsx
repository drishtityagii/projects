import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import './globals.css'
import React from "react";

export const metadata: Metadata = {
  title: 'Layers',
  description: 'Wtv for now',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-background text-foreground">{children}</body>
      </html>
    </ClerkProvider>
  )
}