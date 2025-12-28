import { prisma } from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function Transfer() {
  const session = await getServerSession(authOptions);
  const balance = await getBalance(Number(session?.user.id!) || 0);
  const transactions = await getOnRampTransactions(Number(session?.user.id!) || 0)
  return (
    <div className="mt-10 flex w-full gap-4">
      <AddMoney />

      <div className="w-full flex flex-col gap-3">
      <BalanceCard
        amount={balance?.amount || 0}
        locked={balance?.locked || 0}
      />
      <OnRampTransactions
        transactions={transactions}
      />
      </div>
    </div>
  );
}

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


async function getOnRampTransactions(userId:number){
    try {
     const transactions =  await prisma.onRampTransaction.findMany({
        where: {userId},
        select: {
          amount: true,
          startTime: true,
          provider:true,
          status: true
        }
      })
      return transactions;
    } catch (error) {
      console.log(error)
    }

    return []
}