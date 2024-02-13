import { QueryClientProvider } from '@tanstack/react-query'
import { Comment } from './components/comment'
import { FormAddNewComment } from './components/formAddNewComment'
import './global.css'
import { useComments } from './hooks/useComments'
import { queryClient } from './lib/react-query'

export function App() {
  const { comments } = useComments()
  if (!comments) {
    return <p>...carregando</p>
  }

  return (
    <div className="bg-flash-100 text-payne font-sans antialiased min-h-screen">
      <QueryClientProvider client={queryClient}>
        <main className="bg-white max-w-2xl my-0 mx-auto py-8 px-4 flex flex-col gap-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              userComment={{
                username: comment.user.username,
                avatarUrl: comment.user.avatarUrl,
              }}
              content={comment.content}
              createdAt={comment.createdAt}
              replies={comment.replies}
              score={comment.score}
            />
          ))}
          <FormAddNewComment />
        </main>
      </QueryClientProvider>
    </div>
  )
}
