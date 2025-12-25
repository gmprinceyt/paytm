import { prisma } from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function Transfer() {
  const session = await getServerSession(authOptions);
  const balance = await getBalance(Number(session?.user.id!) || 0);
  return (
    <div className="flex  gap-3">
      {`${JSON.stringify(balance)}`}
      <AddMoney />
      <BalanceCard
        amount={balance?.amount || 0}
        locked={balance?.locked || 0}
      />
      <OnRampTransactions
        transactions={[
          {
            time: new Date(),
            amount: 5000,
            provider: "HDFC Bank",
            status: "Pending",
          },
        ]}
      />
    </div>
  );
}

async function getBalance(id: number) {
  try {
    console.log(id)
    const res = await prisma.balance.findUnique({
      where: { id },
      select: {
        amount: true,
        locked: true,
      },
    });
    console.log(res)
    return res;
  } catch (e) {
    console.log(e);
  }
}
