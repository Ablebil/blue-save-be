import prisma from "../config/database";

export const createDonation = async (donationData: {
  orderId: string;
  amount: number;
  userId: string;
}) => {
  await prisma.donation.create({
    data: {
      orderId: donationData.orderId,
      amount: donationData.amount,
      userId: donationData.userId,
    },
  });
};
