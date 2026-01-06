"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "./Appbar";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="max-w-[1440px] mx-auto px-6 h-[60px] border-b border-slate-300 flex justify-between items-center ">
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
