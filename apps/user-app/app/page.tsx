import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export const getSession = await getServerSession(authOptions);
export default async function Page() {
  if (getSession?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
  
}