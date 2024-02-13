import { useComments } from '@/hooks/useComments'
import { useUser } from '@/hooks/useUser'
import { AvatarImage } from '@radix-ui/react-avatar'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useMedia } from 'react-use'
import { toast } from 'sonner'
import { Person } from '../icons/person'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

export function FormAddNewComment() {
  const { user } = useUser()
  const [comment, setComment] = useState('')
  const { addComment } = useComments()

  function handleChangeComment(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value)
  }

  function handleSubmitNewComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (comment.trim() === '') {
      toast.error('it is not possible to send empty comments')
      return
    }

    if (!user) {
      return
    }

    addComment({
      content: comment,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    })
    setComment(() => '')
  }

  const isMediaMedium = useMedia('(min-width: 768px)')

  return (
    <form
      onSubmit={handleSubmitNewComment}
      className="grid grid-cols-3 grid-rows-3 gap-4 md:grid-cols-3"
      style={{
        gridTemplateColumns: isMediaMedium ? '40px 1fr 64px' : '',
      }}
    >
      <Textarea
        className="col-span-3 row-span-2 md:col-span-1"
        value={comment}
        onChange={handleChangeComment}
      />
      <Avatar className="col-span-1 row-span-1 md:row-start-1 ">
        <AvatarImage src={user?.avatarUrl} />
        <AvatarFallback>
          <Person />
        </AvatarFallback>
      </Avatar>
      <Button
        type="submit"
        className="row-span-1 col-start-3"
        variant={'default'}
        size={'default'}
      >
        Send
      </Button>
    </form>
  )
}
