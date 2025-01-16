import { createRaffles } from "@/actions/raffles"
import { useMutationData } from "./use-mutation-data"

export const useCreateRaffle = (id: string) => {
  const { isPending, mutate } = useMutationData(
    ['create-raffle'],
    (data) => createRaffles({ id, ...data }),
    'user-raffles'
  )

  return { isPending, mutate }
}