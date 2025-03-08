/*
  Warnings:

  - You are about to drop the column `location` on the `Report` table. All the data in the column will be lost.
  - Added the required column `country` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "location",
ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "province" VARCHAR(255) NOT NULL,
ADD COLUMN     "street" VARCHAR(255) NOT NULL;
