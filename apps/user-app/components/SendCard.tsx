"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { TransferP2P } from "../app/lib/actions/TransferP2P";

export function SendCard() {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
  return (
    <div className="">

    <Card title="Send Money, vai phone number">
      <TextInput
        label="Reciever Number "
        placeholder="Enter Number Phone "
        type="tel"
        onChange={(e) => setNumber(e.target.value)}
      />
      <TextInput
        label="Amount "
        placeholder="Enter Amount "
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <br/>
      <Button onClick={async()=> {
        const res =await TransferP2P(number, amount);
        alert(res?.message)
      }}>Send Money</Button>
    </Card>
        </div>

  );
}
