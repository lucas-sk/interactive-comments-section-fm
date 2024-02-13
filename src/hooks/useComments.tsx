import {
  deleteComment,
  getAllComments,
  patchComment,
  postNewComment,
} from '@/lib/http'
import { queryClient } from '@/lib/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { IUser } from './useUser'

export interface IReply {
  id: string
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: IUser
}

export interface IComment {
  id: string
  content: string
  createdAt: string
  score: number
  user: IUser
  replies: IReply[]
}

interface AddCommentData {
  content: string
  user: {
    username: string
    avatarUrl: string
  }
}

interface AddReplyData {
  commentId: string
  content: string
  replyingTo: string
  user: {
    username: string
    avatarUrl: string
  }
}

export function useComments() {
  // const queryClient = useQueryClient()

  // Queries
  const query = useQuery<IComment[]>(
    { queryKey: ['comments'], queryFn: getAllComments },
    queryClient,
  )

  // Mutations
  const mutationPost = useMutation(
    {
      mutationFn: postNewComment,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      },
    },
    queryClient,
  )
  const mutationDelete = useMutation(
    {
      mutationFn: deleteComment,
      onSuccess: (_, variables) => {
        queryClient.setQueryData(['comments'], (data: IComment[]) => {
          const listCommentsWithoutCommentDeleted = data.filter(
            (item) => item.id !== variables,
          )
          return listCommentsWithoutCommentDeleted
        })
        // queryClient.invalidateQueries({ queryKey: ['comments'] })
      },
    },
    queryClient,
  )
  const mutationUpdate = useMutation(
    {
      mutationFn: patchComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      },
    },
    queryClient,
  )

  async function addComment({ content, user }: AddCommentData) {
    const newComment = {
      replies: [],
      content,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      score: 0,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    }

    try {
      mutationPost.mutate(newComment)
      toast.success('Comment added')
    } catch (e) {
      toast.error('Failed to add the new comment.')
    }
  }

  async function removeComment(commentId: string) {
    try {
      mutationDelete.mutate(commentId)
      toast.success('Delete comment with sucess')
    } catch (e) {
      toast.error('Failed to remove the comment')
    }
  }

  async function updateComment({
    comment,
    commentId,
  }: {
    comment: string
    commentId: string
  }) {
    if (!query.data) {
      return
    }

    const indexComment = query.data.findIndex((item) => {
      return item.id === commentId
    })
    try {
      mutationUpdate.mutate({
        data: {
          ...query.data[indexComment],
          content: comment,
        },
        id: commentId,
      })
      toast.success('update comment with sucess')
    } catch (e) {
      toast.error('Failed to update the comment')
    }
  }

  async function addReply({
    commentId,
    content,
    user,
    replyingTo,
  }: AddReplyData) {
    if (!query.data) {
      return
    }

    const newReply = {
      content,
      replyingTo,
      user: {
        avatarUrl: user.avatarUrl,
        username: user.username,
      },
      id: crypto.randomUUID(),
      score: 0,
      createdAt: new Date().toISOString(),
    }

    const indexComment = query.data.findIndex((item) => {
      return item.id === commentId
    })
    const repliesComments = query.data[indexComment].replies

    try {
      mutationUpdate.mutate({
        data: {
          ...query.data[indexComment],
          replies: [...repliesComments, newReply],
        },
        id: commentId,
      })
      toast.success('add reply sucess')
    } catch (e) {
      toast.error('Failed to add the reply')
    }
  }

  async function removeReply({
    commentId,
    replyId,
  }: {
    commentId: string
    replyId: string
  }) {
    if (!query.data) {
      return
    }

    const indexComment = query.data.findIndex((item) => {
      return item.id === commentId
    })
    const repliesComments = query.data[indexComment].replies
    const repliesFilteredWithoutReplyDeleted = repliesComments.filter(
      (reply) => reply.id !== replyId,
    )

    try {
      mutationUpdate.mutate({
        data: {
          ...query.data[indexComment],
          replies: repliesFilteredWithoutReplyDeleted,
        },
        id: commentId,
      })
      toast.success('remove reply with sucess')
    } catch (e) {
      toast.error('Failed to update the comment')
    }
  }

  async function updateReply({
    content,
    replyId,
    commentId,
  }: {
    content: string
    replyId: string
    commentId: string
  }) {
    if (!query.data) {
      return
    }

    const indexComment = query.data.findIndex((item) => {
      return item.id === commentId
    })
    const repliesComments = query.data[indexComment].replies
    const repliesMapChangeContent = repliesComments.map((reply) => {
      if (reply.id === replyId) {
        return {
          ...reply,
          content,
        }
      }
      return reply
    })

    try {
      mutationUpdate.mutate({
        data: {
          ...query.data[indexComment],
          replies: repliesMapChangeContent,
        },
        id: commentId,
      })
      toast.success('update reply with sucess')
    } catch (e) {
      toast.error('Failed to update the reply')
    }
  }

  return {
    addReply,
    removeReply,
    updateReply,
    addComment,
    removeComment,
    updateComment,
    comments: query.data,
  }
}
