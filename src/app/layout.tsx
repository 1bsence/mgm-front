import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import React from "react";

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
      <body className="font-roboto font-medium bg-secondary text-primary">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
