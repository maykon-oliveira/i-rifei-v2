import {
  getAutomationInfo,
  getProfilePosts,
} from '@/actions/automations'
import { getAllRaffles } from '@/actions/raffles'
import { onUserInfo } from '@/actions/user'
import { useQuery } from '@tanstack/react-query'

export const useQueryRaffles = () => {
  return useQuery({
    queryKey: ['user-raffles'],
    queryFn: getAllRaffles,
  })
}

export const useQueryAutomation = (id: string) => {
  return useQuery({
    queryKey: ['automation-info'],
    queryFn: () => getAutomationInfo(id),
  })
}

export const useQueryUser = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo,
  })
}

export const useQueryAutomationPosts = () => {
  const fetchPosts = async () => await getProfilePosts()
  return useQuery({
    queryKey: ['instagram-media'],
    queryFn: fetchPosts,
  })
}


