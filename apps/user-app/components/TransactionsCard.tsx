import { Card } from "@repo/ui/card";

export type TransactionHistoryItem = {
  id: number;
  amount: number;
  timestamp: Date;
  type: string;
  otherUser: {
    id: number;
    name: string |  null;
  };
};
export type TransactionType = "CREDIT" | "DEBIT";


export function TransactionsCard({ history }: { history: TransactionHistoryItem[] }) {
  if (!history.length) {
    return (
      <Card title="P2P Transactions">
        <div className="text-center pb-8 pt-8">No transactions yet!</div>
      </Card>
    );
  }

  return (
    <Card title="P2P Transactions">
      <div className="pt-2 overflow-y-scroll max-h-[260px]">
        {history.map((tx) => (
          <div key={tx.id} className="flex justify-between">
            <span>{tx.otherUser.name}  {tx.otherUser.id }
              <span className="">  {tx.timestamp.toLocaleDateString()}</span>
            </span>
            <span
              className={
                tx.type === "CREDIT" ? "text-green-500" : "text-red-500"
              }
            >
              {tx.type === "CREDIT" ? "+" : "-"}₹{tx.amount/100}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
