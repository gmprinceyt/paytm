import type { Metadata } from "next";
import "../styles/globals.css";
import { geistMono, geistSans, satoshi } from "../styles/font";
import { Providers } from "../components/provider";
import { AppbarClient } from "../components/AppbarClient";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${geistMono.variable} ${geistSans.variable} font-sens`}
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
