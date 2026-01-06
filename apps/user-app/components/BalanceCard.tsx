import { prisma } from "@repo/db";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const BalanceCard = async () => {
  const getSession = await getServerSession(authOptions);
  const balance = await getBalance(Number(getSession?.user.id) || 0);
  const amount = balance?.amount || 0;
  const locked = balance?.locked || 0;
  return (
    <div className="max-h-[260px] w-full">
      <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
          <div>Unlocked balance</div>
          <strong>{amount / 100} INR</strong>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div>Total Locked Balance</div>
          <div>{locked / 100} INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div>Total Balance</div>
          <strong>{(locked + amount) / 100} INR</strong>
        </div>
      </Card>
    </div>
  );
};

async function getBalance(id: number) {
  try {
    const res = await prisma.balance.findUnique({
      where: { userId: id },
      select: {
        amount: true,
        locked: true,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
  return null;
}
