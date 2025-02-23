-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" VARCHAR(255),
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3);
