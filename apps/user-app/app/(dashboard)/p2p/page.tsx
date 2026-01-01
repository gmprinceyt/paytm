import { SendCard } from "../../../components/SendCard";
import { TransactionsCard } from "../../../components/TransactionsCard";



export default async function P2P() {
  
  return (
    <div className="flex items-center justify-center w-full mt-16 flex-col gap-10">
      <SendCard />
      <TransactionsCard />
    </div>
  );
}
