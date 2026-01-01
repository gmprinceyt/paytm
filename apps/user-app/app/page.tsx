import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const getSession = await getServerSession(authOptions);
  if (getSession?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
