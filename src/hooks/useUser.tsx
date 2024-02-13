import { getCurrentUser } from '@/lib/http'
import { queryClient } from '@/lib/react-query'
import { useQuery } from '@tanstack/react-query'

export interface IUser {
  avatarUrl: string
  username: string
}

export function useUser() {
  const { data } = useQuery<IUser>(
    {
      queryKey: ['currentUser'],
      queryFn: getCurrentUser,
    },
    queryClient,
  )

  return {
    user: data,
  }
}
