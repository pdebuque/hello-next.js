import React from 'react'
import Link from 'next/link'
import { prisma } from '@/db'
import { redirect } from 'next/navigation'

//FormData is a built-in type
async function createTodo(data: FormData) {

  "use server" // server code; never on the client

  const title = data.get('title')?.valueOf()
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('invalid title')
  };

  await prisma.todo.create({
    data: {title, complete: false}
  });

  redirect('/')

}

const page = () => {
  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2x1'>New</h1>
      </header>
      <form
        action={createTodo}
        className='flex gap-2 flex-col'>
        <input
          type='text'
          className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within: border-slate-100'
          name='title' />
        <div className="flex gap-1 justify-end">
          <Link href='..' className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-500">Cancel</Link>
          <button
            type='submit' className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-500">Create</button>
        </div>


      </form>
    </>
  )
}

export default page