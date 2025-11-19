import { prisma } from "@repo/db";

export default async function Home() {
  const user = await prisma.user.findFirst() 
  return (
    <div className="text-2xl    ">
      {user?.name ?? "No user added yet"}
    </div>
  );
}