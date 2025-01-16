import { getAutomationInfo } from '@/actions/automations'
import { getAllRaffles } from '@/actions/raffles'
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

export const PrefetchUserAutomation = async (
  client: QueryClient,
  automationId: string
) => {
  return await prefetch(
    client,
    () => getAutomationInfo(automationId),
    'automation-info'
  )
}
