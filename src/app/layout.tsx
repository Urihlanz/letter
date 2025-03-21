import "./globals.css";

import "cal-sans";

import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { type JSX } from "react";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Letter",
  description:
    "Letter is a suite of open source content editing tools for developers building apps like Notion or Google Docs.",
  robots: "noindex, nofollow",
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
  return (
    <html className="h-full font-sans" lang="en">
      <body className="flex flex-col h-full">
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
