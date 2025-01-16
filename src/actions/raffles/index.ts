'use server'

import { onCurrentUser } from "../user"
import { createRaffle } from "./queries"

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