import cron from "node-cron";
import prisma from "../config/database";

cron.schedule("0 * * * *", async () => {
  try {
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        verified: false,
        createdAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    console.log(`Deleted ${deletedUsers.count} unverified users.`);
  } catch (err) {
    console.error("Failed to delete unverified users:", err);
  }
});

console.log("Scheduled job to delete unverified users is running...");
