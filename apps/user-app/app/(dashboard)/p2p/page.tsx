import { prisma } from "@repo/db";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { TransactionsCard } from "../../../components/TransactionsCard";

// function Transactions(userId: number): Promise<({
//     fromUser: {
//         id: number;
//         name: string | null;
//     };
//     toUser: {
//         id: number;
//         name: string | null;
//     };
// } & {
//     id: number;
//     amount: number;
//     timestamp: Date;
//     fromUserId: number;
//     toUserId: number;
// })[]>

export type P2PTransferWithUsers = {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  fromUser: {
    id: number;
    name: string | null;
  };
  toUser: {
    id: number;
    name: string | null;
  };
};

export default async function P2P() {
  const session = await getServerSession(authOptions);
  const raw = await Transactions(Number(session?.user?.id) || 0);
  const history = formatTransactions(raw, Number(session?.user?.id) || 0);

  return (
    <div className="flex items-center justify-center w-full mt-16 flex-col gap-10">
      <SendCard />
      <TransactionsCard history={history} />
    </div>
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
          select: { id: true, name: true },
        },
        toUser: {
          select: { id: true, name: true },
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
      id :  tx.fromUserId === userId ? tx.toUser.id : tx.fromUser.id
    },
  }));
}
