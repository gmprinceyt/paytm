"use client";

import { balance as Abalance, useAtom } from "@repo/store";
import { signIn, useSession } from "next-auth/react";


export default function Home() {
  const session = useSession();
  const [balance, setBalance] = useAtom(Abalance);
  

  return (
    <div>
      {`${JSON.stringify(session.data?.user) || ""}`}
      <h1>{balance}</h1>
      <button onClick={()=> setBalance(pre => pre+1) }>inscrese</button>
      <button onClick={async ()=> await signIn()}>sigin</button>
    </div>
  );
}
