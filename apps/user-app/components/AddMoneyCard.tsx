"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
export function AddMoney() {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [value, setValue] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          type={"number"}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <div className="py-4 text-left">Bank</div>

        <Select
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
        />

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              createOnRampTransaction(provider, value);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
