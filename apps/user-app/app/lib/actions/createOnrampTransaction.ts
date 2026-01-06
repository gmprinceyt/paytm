"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number,
) {
  if (amount < 1) {
    return;
  }
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  try {
    // temp Token
    const token = (Math.random() * 1000).toString();

    const result = await prisma.onRampTransaction.create({
      data: {
        provider,
        amount: amount * 100,
        startTime: new Date(),
        status: "Processing",
        userId: Number(session?.user.id),
        token,
      },
    });

    return {
      message: "Done",
      token: result.token,
    };
  } catch (error) {
    console.log(error);
  }
}
