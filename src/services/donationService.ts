import snap from "../config/midtrans";
import { randomUUID } from "crypto";
import HttpError from "../utils/HttpError";

export const createTransaction = async (
  amount: number,
  customerDetails: any,
  userId: string
) => {
  try {
    const orderId = `ORDER-${randomUUID()}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: customerDetails,
      custom_field1: userId,
    };

    const transaction = await snap.createTransaction(parameter);
    return transaction;
  } catch (err) {
    console.log(err);
    throw new HttpError("Failed to create payment", 500);
  }
};
