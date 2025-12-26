import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    amount: number;
    status: "Success" | "Processing" | "Failure";
    provider: string;
    startTime: Date;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.startTime.toDateString()} 
                <span>  {t.status}</span> 
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
