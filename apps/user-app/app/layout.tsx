import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/provider";
import { AppbarClient } from "../components/AppbarClient";
import Sidebar from "../components/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Payment Wallet – Fast, Secure & Easy Online Payments",
  description: "Use our digital payment wallet to send, receive, and manage money securely. Fast transactions, instant payments, and safe online wallet for everyday use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${geistSans.variable} font-sens`}
    >
      <body>
        <Providers>
          <AppbarClient />
          <Sidebar>{children}</Sidebar>
        </Providers>
      </body>
    </html>
  );
}
