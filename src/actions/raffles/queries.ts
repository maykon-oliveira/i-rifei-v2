'use server'

import { client } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createRaffle = async (clerkId: string, {drawDate, ...data}: Prisma.RaffleCreateInput) => {
  // TODO: Create numbers
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      createdRaffles: {
        // TODO: timezone
        create: {drawDate: `${drawDate}:00Z`, ...data},
      },
    },
  })
}