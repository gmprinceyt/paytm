import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { TransactionsCard } from "../../../components/TransactionsCard";
import { authOptions } from "../../lib/auth";

export default async function Dashboard() {
    const getSession = await getServerSession(authOptions);
  return (
    <div className="py-4 ">
      <div className="text-xl font-extrabold">
        Pay<span className="text-blue-500  mr-2">TM</span>
        Deshboard,
      </div>
      <strong>Welcome back, <span className="text-yellow-500">{getSession?.user.name}</span></strong>
      <div className="mt-4">
        <div className="flex gap-4 mb-4">
          <BalanceCard />
          <OnRampTransactions />
        </div>
        <TransactionsCard />
      </div>
    </div>
  );
}
