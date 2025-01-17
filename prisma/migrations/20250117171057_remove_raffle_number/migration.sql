/*
  Warnings:

  - You are about to drop the column `status` on the `RaffleNumber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RaffleNumber" DROP COLUMN "status";

-- DropEnum
DROP TYPE "RaffleNumberStatus";
