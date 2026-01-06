import { prisma } from "@repo/db";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const OnRampTransactions = async () => {
  const getSession = await getServerSession(authOptions);
  const transactions = await getOnRampTransactions(
    Number(getSession?.user.id) || 0,
  );

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2 overflow-y-scroll max-h-[260px]">
        {transactions.reverse().map((t, i) => (
          <div key={i} className="flex justify-between ">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.startTime.toDateString()}
                <span
                  className={` ${t.status === "Success" && "text-green-400"} text-black font-medium`}
                >
                  {" "}
                  {t.status}
                </span>
              </div>
            </div>
            <strong
              className={`flex flex-col justify-center ${t.status === "Success" && "text-green-400"} ${t.status === "Failure" && "text-red-400"}`}
            >
              + Rs {t.amount / 100}
            </strong>
          </div>
        ))}
      </div>
    </Card>
  );
};

async function getOnRampTransactions(userId: number) {
  try {
    const transactions = await prisma.onRampTransaction.findMany({
      where: { userId },
      select: {
        amount: true,
        startTime: true,
        provider: true,
        status: true,
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
  }

  return [];
}
