import prisma from "../config/database";

export const createDonation = async (donationData: {
  orderId: string;
  amount: number;
  phone: string;
  userId: string;
}) => {
  await prisma.donation.create({
    data: {
      orderId: donationData.orderId,
      amount: donationData.amount,
      phone: donationData.phone,
      userId: donationData.userId,
    },
  });
};
