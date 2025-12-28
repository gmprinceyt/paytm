"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function TransferP2P(toNumber: string, amount: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized request" };
  }

  if (amount <= 0) {
    return { success: false, message: "Invalid amount" };
  }

  try {
    const toUser = await prisma.user.findUnique({
      where: { number: toNumber },
      select: { id: true },
    });

    if (!toUser) {
      return { success: false, message: `User not found: ${toNumber}` };
    }

    const from = Number(session.user.id);
    const to = toUser.id;

    if (from === to) {
      return { success: false, message: "Cannot transfer to yourself" };
    }

    await prisma.$transaction(
      async (tx) => {
        const senderBalance = await tx.balance.findUnique({
          where: { userId: from },
        });

        if (!senderBalance || senderBalance.amount < amount) {
          throw new Error("Insufficient funds");
        }

        // ensure receiver balance exists
        await tx.balance.upsert({
          where: { userId: to },
          update: {},
          create: { userId: to, amount: 0 },
        });

        await tx.balance.update({
          where: { userId: from },
          data: { amount: { decrement: amount * 100 } },
        });

        await tx.balance.update({
          where: { userId: to },
          data: { amount: { increment: amount * 100} },
        });
      },
      {
        isolationLevel: "Serializable",
      }
    );

    return { success: true, message: "Transfer successful" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Transfer failed",
    };
  }
}
