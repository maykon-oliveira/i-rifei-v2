/*
  Warnings:

  - You are about to drop the column `endDate` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Raffle` table. All the data in the column will be lost.
  - Added the required column `drawDate` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RaffleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "drawDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "RaffleStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "description" DROP NOT NULL;
