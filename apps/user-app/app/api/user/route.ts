import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

export const GET = async () => {
  const res = await prisma.user.create({
    data: {
      email: "asd",
      name: "adsads",
    },
  });
  console.log(res)
  return NextResponse.json({
    message: "hi there",
  });
};
