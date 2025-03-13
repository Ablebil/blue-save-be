import { Request, Response } from "express";
import { createDonation } from "../repositories/donationRepository";
import HttpError from "../utils/HttpError";

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    if (payload.transaction_status === "settlement") {
      await createDonation({
        orderId: payload.order_id,
        amount: parseFloat(payload.gross_amount),
        userId: payload.custom_field1,
      });
    }

    res.status(200).send("OK");
  } catch {
    throw new HttpError("Error handling webhook", 500);
  }
};
