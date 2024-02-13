import { useComments } from '@/hooks/useComments'
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
import { Textarea } from '../ui/textarea'

interface ReplyProps {
  id: string
  content: string
  createdAt: string
  score: number
  commentId: string
  userComment: {
    username: string
    avatarUrl: string
  }
  replyingTo: string
}

export function Reply({
  id,
  score,
  content,
  commentId,
  replyingTo,
  createdAt,
  userComment,
}: ReplyProps) {
  const { user } = useUser()
  const { removeReply, updateReply, addReply } = useComments()
  const [shouldShowEditor, setShouldShowEditor] = useState(false)
  const [shouldShowEditorReply, setShouldShowEditorReply] = useState(false)
  const isCommentUserEqualCurrentUser = user?.username === userComment?.username
  const [reply, setReply] = useState(content)

  function handleDeleteReply() {
    removeReply({
      replyId: id,
      commentId,
    })
  }

  function handleEditComment() {
    setShouldShowEditor((state) => !state)
  }

  function handleCancelUpdateReply() {
    setShouldShowEditor(false)
  }

  function handleUpdateReply() {
    if (reply.trim() === '') {
      toast.error('it is not possible to send empty replies')
      return
    }

    updateReply({ replyId: id, content: reply, commentId })
    setShouldShowEditor(false)
  }

  function handleReplyComment(e: ChangeEvent<HTMLTextAreaElement>) {
    setReply(() => e.target.value)
  }

  function handleToggleEditorReply() {
    setShouldShowEditorReply((state) => !state)
  }

  function handleAddReply(content: string) {
    if (!user) {
      return
    }
    addReply({
      content,
      replyingTo: userComment.username,
      commentId,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    })
    setShouldShowEditorReply(() => false)
  }

  const isMediaMedium = useMedia('(min-width: 768px)')

  return (
    <div className="space-y-4">
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
            <AvatarImage src={userComment?.avatarUrl} alt="avatar" />
            <AvatarFallback>
              <Person />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg text-charcoal font-semibold">
            {userComment?.username}
          </h2>
          {isCommentUserEqualCurrentUser && <Badge>You</Badge>}
          <p className="text-xs text-payne">
            {formatDistanceToNow(createdAt)} ago
          </p>
        </CardHeader>
        <CardContent className="col-span-3 row-start-2 md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-2">
          {shouldShowEditor && (
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
          {!shouldShowEditor && (
            <p className="text-payne">
              {replyingTo && (
                <span className="text-iris font-bold">@{replyingTo}</span>
              )}
              {content.split(' ').map((word, index) => {
                if (word.startsWith('@')) {
                  return (
                    <span key={index} className="text-iris font-bold">
                      {' '}
                      {word}{' '}
                    </span>
                  )
                }
                return ' ' + word + ' '
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
              {shouldShowEditor && (
                <div className="flex gap-2">
                  <Button
                    className="gap-2"
                    size={'sm'}
                    variant={'secondary'}
                    onClick={handleCancelUpdateReply}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="gap-2"
                    size={'sm'}
                    variant={'default'}
                    onClick={handleUpdateReply}
                  >
                    Update
                  </Button>
                </div>
              )}
              {!shouldShowEditor && (
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
                          will remove the comment and can&apos;t be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant={'secondary'}>No, cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild onClick={handleDeleteReply}>
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
      {shouldShowEditorReply && <FormAddNewReply onAddReply={handleAddReply} />}
    </div>
  )
}
