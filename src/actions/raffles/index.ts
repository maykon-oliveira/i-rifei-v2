'use server'

import { onCurrentUser } from "../user"
import { createRaffle, findRaffle, getRaffles, updateRaffle } from "./queries"

export const createRaffles = async (data: any) => {
  const user = await onCurrentUser()
  try {
    const create = await createRaffle(user.id, data)
    if (create) return { status: 200, data: 'Rifa criada', res: create }

    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}


export const getAllRaffles = async () => {
  const user = await onCurrentUser()
  try {
    const raffles = await getRaffles(user.id)

    if (raffles) return { status: 200, data: raffles.createdRaffles }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 500, data: [] }
  }
}

export const getRaffleInfo = async (id: string) => {
  await onCurrentUser()
  try {
    const raffle = await findRaffle(id)
    if (raffle) return { status: 200, data: raffle }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const updateRaffleName = async (
  raffleId: string,
  data: {
    name?: string
    active?: boolean
    raffle?: string
  }
) => {
  await onCurrentUser()
  try {
    const update = await updateRaffle(raffleId, data)
    if (update) {
      return { status: 200, data: 'Rifa atualizada com sucesso!' }
    }
    return { status: 404, data: 'Oops! could not find automation' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}