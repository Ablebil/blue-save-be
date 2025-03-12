import { Request, Response, NextFunction } from "express";
import { createTransaction } from "../services/donationService";
import { matchedData } from "express-validator/lib";

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, phone } = matchedData(req);
    const { id: userId, name, email } = (req as any).user;

    const customerDetails = {
      first_name: name,
      email,
      phone,
    };

    const trueAmount = amount * 1.01;

    const transaction = await createTransaction(
      trueAmount,
      customerDetails,
      userId
    );

    res.status(200).json({
      message: "Donation successful",
      transaction,
    });
  } catch (err) {
    next(err);
  }
};
