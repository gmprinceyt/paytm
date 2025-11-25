"use client";

import { Provider as GlobalState } from "@repo/store";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <GlobalState>{children}</GlobalState>
    </SessionProvider>
  );
};
