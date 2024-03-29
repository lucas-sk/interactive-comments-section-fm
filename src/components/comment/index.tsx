import { IReply, useComments } from '@/hooks/useComments'
import { useUser } from '@/hooks/useUser'
import { formatDistanceToNow } from 'date-fns'
import { ChangeEvent, useState } from 'react'
import { useMedia } from 'react-use'
import { toast } from 'sonner'

import { Count } from '../count'
import { FormAddNewReply } from '../formAddNewReply'
import { Delete } from '../icons/delete'
import { Edit } from '../icons/edit'
import { Person } from '../icons/person'
import { ReplyIcon } from '../icons/reply'
import { Reply } from '../reply'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

interface CommentProps {
  id: string
  content: string
  createdAt: string
  score: number
  userComment: {
    username: string
    avatarUrl: string
  }
  replies: IReply[]
  // onRemoveComment: (id: string) => void
  // onUpdateComment: ({ id, content }: { id: string; content: string }) => void
  // onAddReplyInComment: ({
  //   commentId,
  //   content,
  // }: {
  //   commentId: string
  //   replyingTo: string
  //   content: string
  // }) => void
  // onRemoveReply: ({
  //   replyId,
  //   commentId,
  // }: {
  //   replyId: string
  //   commentId: string
  // }) => void
  // onUpdateReply: ({
  //   replyId,
  //   commentId,
  //   content,
  // }: {
  //   replyId: string
  //   content: string
  //   commentId: string
  // }) => void
}

export function Comment({
  id,
  content,
  createdAt,
  score,
  replies,
  userComment,
  // onRemoveComment,
  // onUpdateComment,
}: CommentProps) {
  const { user } = useUser()
  const { removeComment, updateComment, addReply } = useComments()
  const [shouldShowEditorComment, setShouldShowEditorComment] = useState(false)
  const [shouldShowEditorReply, setShouldShowEditorReply] = useState(false)
  const isCommentUserEqualCurrentUser = user?.username === userComment?.username
  const [reply, setReply] = useState(content)

  function handleDeleteComment() {
    removeComment(id)
  }

  function handleEditComment() {
    setShouldShowEditorComment((state) => !state)
  }

  function handleToggleEditorReply() {
    setShouldShowEditorReply((state) => !state)
  }

  function handleReplyComment(e: ChangeEvent<HTMLTextAreaElement>) {
    setReply(() => e.target.value)
  }

  function handleUpdateComment() {
    if (reply.trim() === '') {
      toast.error('it is not possible to send empty comments')
    }

    updateComment({
      commentId: id,
      comment: reply,
    })
    setShouldShowEditorComment(false)
  }

  function handleCancelUpdateComment() {
    setShouldShowEditorComment(false)
  }

  function onAddReply(content: string) {
    if (!user) {
      return
    }

    addReply({
      content,
      replyingTo: userComment.username,
      commentId: id,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    })

    setShouldShowEditorReply(() => false)
  }

  const isMediaMedium = useMedia('(min-width: 768px)')

  return (
    <>
      <Card
        className="mb-4 grid grid-cols-3 grid-rows-3 p-6 md:grid-rows-2 gap-6"
        style={{
          gridTemplateColumns: isMediaMedium ? '40px 1fr 80px' : '',
          gridTemplateRows: isMediaMedium
            ? 'fit-content(40%)'
            : 'auto auto auto',
        }}
      >
        <CardHeader className="flex flex-row items-baseline gap-2  col-span-3 md:col-start-2 row-start-1">
          <Avatar className="h-6 w-6 self-end">
            <AvatarImage src={userComment.avatarUrl} alt="avatar" />
            <AvatarFallback>
              <Person />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg text-charcoal font-semibold">
            {userComment.username}
          </h2>
          {isCommentUserEqualCurrentUser && <Badge>You</Badge>}
          <p className="text-xs text-payne">
            {formatDistanceToNow(createdAt)} ago
          </p>
        </CardHeader>
        <CardContent className="col-span-3 row-start-2 md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-2">
          {shouldShowEditorComment && (
            <Textarea
              value={reply}
              onChange={handleReplyComment}
              autoFocus
              onFocus={(e) => {
                const value = e.target.value
                e.target.value = ''
                e.target.value = value
              }}
            />
          )}
          {!shouldShowEditorComment && (
            <p className="text-payne">
              {content.split(' ').map((word, index) => {
                if (word.startsWith('@')) {
                  return (
                    <span key={index} className="text-iris font-bold">
                      {' '}
                      {word}{' '}
                    </span>
                  )
                }
                return word + ' '
              })}
            </p>
          )}
        </CardContent>

        <Count
          className="row-start-3 md:col-start-1 md:row-start-1 md:row-span-2 self-center md:max-h-24"
          stateInitial={score}
        />
        <CardFooter className="justify-end flex items-center col-start-3 row-start-3 md:col-start-3 md:row-start-1 p-0">
          {!isCommentUserEqualCurrentUser && (
            <Button
              className="gap-2"
              size={'sm'}
              variant={'outline'}
              onClick={handleToggleEditorReply}
            >
              <ReplyIcon />
              Reply
            </Button>
          )}
          {isCommentUserEqualCurrentUser && (
            <>
              {shouldShowEditorComment && (
                <div className="flex gap-2">
                  <Button
                    className="gap-2"
                    size={'sm'}
                    variant={'secondary'}
                    onClick={handleCancelUpdateComment}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="gap-2"
                    size={'sm'}
                    variant={'default'}
                    onClick={handleUpdateComment}
                  >
                    Update
                  </Button>
                </div>
              )}
              {!shouldShowEditorComment && (
                <div className="flex">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="gap-2"
                        size={'sm'}
                        variant={'destructiveOutline'}
                      >
                        <Delete />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete comment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this comment? This
                          will remove the comment and can&apost be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant={'secondary'}>No, cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction
                          asChild
                          onClick={handleDeleteComment}
                        >
                          <Button variant={'destructive'}>Yes, DELETE</Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    className="gap-2"
                    size={'sm'}
                    variant={'outline'}
                    onClick={handleEditComment}
                  >
                    <Edit />
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </CardFooter>
      </Card>
      {shouldShowEditorReply && <FormAddNewReply onAddReply={onAddReply} />}
      {replies.length > 0 && (
        <div
          className="grid grid-cols-2 auto-cols-auto gap-x-6 gap-y-4"
          style={{
            gridTemplateColumns: '1px 1fr',
          }}
        >
          <Separator
            orientation="vertical"
            className="col-span-1 bg-periwinkle"
          />
          <div className="flex-1 flex flex-col gap-4">
            {replies.map((reply) => (
              <Reply
                id={reply.id}
                key={reply.id}
                commentId={id}
                content={reply.content}
                createdAt={reply.createdAt}
                replyingTo={reply.replyingTo}
                score={reply.score}
                userComment={reply.user}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
