import { IComment } from '@/hooks/useComments'
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3001/',
})

interface PostNewCommentData {
  id: string
  replies: {
    id: string
    content: string
    createdAt: string
    score: number
    replyingTo: string
    user: {
      username: string
      avatarUrl: string
    }
  }[]
  content: string
  createdAt: string
  score: number
  user: {
    username: string
    avatarUrl: string
  }
}

export async function getCurrentUser() {
  const response = await http.get('/currentUser')
  return response.data
}

export async function getAllComments() {
  const response = await http.get('/comments')
  return response.data
}

export async function postNewComment(data: PostNewCommentData) {
  const response = await http.post('/comments', data)
  return response.data
}

export async function deleteComment(id: string) {
  const response = await http.delete(`/comments/${id}`)
  return response.data
}

interface PatchCommentData {
  id: string
  data: IComment
}

export async function patchComment({ id, data }: PatchCommentData) {
  const response = await http.patch(`/comments/${id}`, data)
  return response.data
}
