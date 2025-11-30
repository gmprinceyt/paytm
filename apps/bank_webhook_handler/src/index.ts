import express from "express";
import { prisma } from "@repo/db";
import { TPaymentInfo } from "./type";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: TPaymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    prisma.$transaction([
      prisma.balance.updateMany({
        where: { userId: Number(paymentInformation.userId) },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
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

app.listen(3003, ()=> console.log("Back_webhook server started at http://localhost:3003"))
