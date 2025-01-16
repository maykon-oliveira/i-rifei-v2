-- DropForeignKey
ALTER TABLE "RaffleNumber" DROP CONSTRAINT "RaffleNumber_raffleId_fkey";

-- AddForeignKey
ALTER TABLE "RaffleNumber" ADD CONSTRAINT "RaffleNumber_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
