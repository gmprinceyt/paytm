import React from "react";

export function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className=" p-4">
      <h1 className="text-xl  pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
