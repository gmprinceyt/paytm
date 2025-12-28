"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function TransferP2P(toNumber: string, amount: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id || !session) {
    return {
      message: "Unauthorized request",
      success: false,
    };
  }
  try {
    const toUser = await prisma.user.findUnique({
      where: { number: toNumber },
      select: { id: true },
    });

    if (!toUser || toUser.id) {
      return {
        success: false,
        message:    `user not found ${toNumber}`,
      };
    }

    //  User details -> For Do transactions
    const to = toUser.id;
    const from = session.user.id;

    // Transaction Start
    await prisma.$transaction(async function (tx) {
      const user = await tx.balance.findUnique({
        where: { userId: Number(from) },
        select: {
          amount: true,
        },
      });

      if (!user || user.amount <= amount) {
        return {
          success: false,
          message: "insufficient funds",
        };
      }

      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: to,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
    });
    // End
    return { message: "Payment Successfully Done", success: true };
  } catch (error) {
    console.log(error);
  };
  return null
}
