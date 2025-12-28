import React from "react";

export function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className=" bg-[#ffffff] w-full px-4 py-6 shadow-md   rounded-md h-full  ">
      <h1 className="text-xl font-mono  pb-2 font-medium">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
   