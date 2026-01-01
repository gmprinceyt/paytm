import "dotenv/config";
import express from "express";
import { prisma } from "@repo/db";
import { TPaymentInfo } from "./type.js";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: TPaymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    // Check user payment status if not equl to processing then throw error
    const result = await prisma.onRampTransaction.findUnique({
      where: {
        token: paymentInformation.token,
        userId: Number(paymentInformation.userId),
      },
      select: {
        status: true,
      },
    });

    if (result?.status !== "Processing" || result === null) {
      return res.status(411).json({
        message: "Something Went Wrong onRampTransaction",
      });
    }

    await prisma.$transaction([
      prisma.balance.upsert({
        where: { userId: Number(paymentInformation.userId) },
        create: {
          amount: Number(paymentInformation.amount),
          userId: Number(paymentInformation.userId),
        },
        update: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
          userId: Number(paymentInformation.userId),
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003, () =>
  console.log("Back_webhook server started at http://localhost:3003")
);
