import Link from 'next/link'
import { prisma } from '@/db'
import  TodoItem  from '@/components/TodoItem'

function getTodos() {
  return prisma.todo.findMany({
    orderBy: [{complete: 'asc'},{ createdAt: 'desc' }]
  })
}

async function toggleTodo (id: string, complete: boolean) {
  "use server"

  console.log(id, complete)

  await prisma.todo.update({
    where: { id },
    data: { complete }
  })
}

export default async function Home() {

  // await prisma.todo.create({ data: { title: "test", complete: false } })
  const todos = await getTodos() // all code happens server side; the server just sends html to client

  // warning: cannot use react hooks here

  return (
    <>
      <header className='flex justify-between items-center mb-4'>

        <h1 className='text-2x1'>Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-500"
          href="/new">
          New
        </Link>

      </header>
      <ul className='pl-4'>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo = {toggleTodo} />
        ))}
      </ul>
    </>
  )
}