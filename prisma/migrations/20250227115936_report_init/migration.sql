-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'VERIFIED', 'FORWARDED');

-- CreateTable
CREATE TABLE "Report" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "media" VARCHAR(255) NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
