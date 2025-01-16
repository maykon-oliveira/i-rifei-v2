'use server'

import { client } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createRaffle = async (clerkId: string, { drawDate, ...data }: Prisma.RaffleCreateInput) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      createdRaffles: {
        // TODO: timezone
        create: {
          drawDate: `${drawDate}:00Z`,
          numbers: {
            createMany: {
              data: Array.from({ length: data.totalNumbers }, (_, i) => ({ number: i + 1 }))
            }
          },
          ...data
        },
      },
    },
  })
}

export const getRaffles = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      createdRaffles: {
        orderBy: {
          createdAt: 'asc',
        },

        select: {
          id: true,
          drawDate: true,
          name: true,
          status: true,
          createdAt: true,
          totalNumbers: true,
          purchases: {
            select: {
              _count: {
                select: {
                  raffleNumbers: true
                }
              }
            }
          }
        }
      },
    },
  })
}