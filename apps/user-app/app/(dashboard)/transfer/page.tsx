import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";

export default function Transfer() {
  return (
    <div className="flex  gap-3">
      <AddMoney/>
      <BalanceCard amount={1000} locked={20000}/>
      <OnRampTransactions transactions={[{time: new Date(), amount: 5000, provider: "HDFC Bank",  status: "Pending"}]}/>
    </div>
  );
}
