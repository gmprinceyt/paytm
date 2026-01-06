import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";

export default async function Transfer() {
  return (
    <div className="mt-10 flex w-full gap-4">
      <AddMoney />

      <div className="w-full flex flex-col gap-3">
        <BalanceCard />
        <OnRampTransactions />
      </div>
    </div>
  );
}
