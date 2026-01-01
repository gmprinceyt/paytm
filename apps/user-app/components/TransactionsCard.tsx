import { Card } from "@repo/ui/card";
import { getSession } from "../app/page";
import { prisma } from "@repo/db";

export type P2PTransferWithUsers = {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  fromUser: {
    id: number;
    name: string | null;
    number: string;
  };
  toUser: {
    id: number;
    name: string | null;
    number: string;
  };
};

export async function TransactionsCard() {
  const raw = await Transactions(Number(getSession?.user?.id) || 0);
  const history = formatTransactions(raw, Number(getSession?.user?.id) || 0);

  if (!history.length) {
    return (
      <Card title="P2P Transactions">
        <div className="text-center pb-8 pt-8">No transactions yet!</div>
      </Card>
    );
  }

  return (
    <Card title="Person To Person Transaction.">
      <div className="pt-2 overflow-y-scroll max-h-[250px]">
        <div className="flex justify-between  font-bold ">
          <div className="space-x-6">
            <span>Name</span>
            <span>Number</span>
            <span>Date</span>
          </div>
          <span>Amount</span>
        </div>
        {history.map((tx) => (
          <div key={tx.id} className="flex justify-between font-medium text-sm">
            <div className="space-y-2">
              <span className="">{tx.otherUser.name} </span>
              <span className="text-neutral-600">{tx.otherUser.number}</span>
              <span className="text-gray-400 text-sm ">
                {" "}
                {tx.timestamp.toLocaleDateString()}
              </span>
            </div>
            <strong
              className={
                tx.type === "CREDIT" ? "text-green-500" : "text-red-500"
              }
            >
              {tx.type === "CREDIT" ? "+" : "-"}₹{tx.amount / 100}
            </strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

async function Transactions(userId: number): Promise<P2PTransferWithUsers[]> {
  try {
    const transactions = await prisma.p2pTransfer.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
      },
      orderBy: {
        timestamp: "desc",
      },
      include: {
        fromUser: {
          select: { id: true, name: true, number: true },
        },
        toUser: {
          select: { id: true, name: true, number: true },
        },
      },
    });

    return transactions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function formatTransactions(
  transactions: P2PTransferWithUsers[],
  userId: number
) {
  return transactions.map((tx) => ({
    id: tx.id,
    amount: tx.amount,
    timestamp: tx.timestamp,
    type: tx.fromUserId === userId ? "DEBIT" : "CREDIT",
    otherUser: {
      name: tx.fromUserId === userId ? tx.toUser.name : tx.fromUser.name,
      id: tx.fromUserId === userId ? tx.toUser.id : tx.fromUser.id,
      number: tx.fromUserId === userId ? tx.toUser.number : tx.fromUser.number,
    },
  }));
}
