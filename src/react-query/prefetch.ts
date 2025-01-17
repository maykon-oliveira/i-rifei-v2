import { getAllRaffles, getRaffleInfo } from '@/actions/raffles'
import { onUserInfo } from '@/actions/user'
import { QueryClient, QueryFunction } from '@tanstack/react-query'

const prefetch = async (
  client: QueryClient,
  action: QueryFunction,
  key: string
) => {
  return await client.prefetchQuery({
    queryKey: [key],
    queryFn: action,
    staleTime: 60000,
  })
}

export const PrefetchUserProfile = async (client: QueryClient) => {
  return await prefetch(client, onUserInfo, 'user-profile')
}

export const PrefetchUserRaffles = async (client: QueryClient) => {
  return await prefetch(client, getAllRaffles, 'user-raffles')
}

export const PrefetchUserRaffle = async (
  client: QueryClient,
  raffleId: string
) => {
  return await prefetch(
    client,
    () => getRaffleInfo(raffleId),
    'raffle-info'
  )
}
