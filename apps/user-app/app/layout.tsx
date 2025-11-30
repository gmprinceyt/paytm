import type { Metadata } from "next";
import "../styles/globals.css";
import { geistMono, inter, satoshi } from "../styles/font";
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
      className={`${inter.variable}, ${satoshi.variable}, ${geistMono.variable}`}
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
