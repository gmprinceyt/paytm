import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

export const GET = async () => {
  const res = await prisma.user.create({
    data: {
      email: "aman4545@gmail.com",
      name: "Aman",
      number: "123456",
      password: "12345",
    },
  });
  console.log(res);
  return NextResponse.json({
    message: "User Created Successfully!!",
    res,
  });
};
