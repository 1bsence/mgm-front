import type { Metadata } from "next";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import NavBar from "@/components/NavBar";
export const metadata: Metadata = {
  title: "Return of MGM",
  description: "Created by MGM team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-roboto font-medium bg-background text-text-normal flex flex-wrap">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
