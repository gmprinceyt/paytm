import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";

export default function Transfer() {
  return (
    <div>
      <AddMoney/>
      <BalanceCard amount={1000} locked={20000}/>
    </div>
  );
}
