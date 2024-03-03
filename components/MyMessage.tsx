'use client'

import { useEffect, useState } from 'react'
import { MyMessageEditor } from './MyMessageEditor'

export function MyMessage ({ initialMessage }: { initialMessage: string }) {
  const [message, setMessage] = useState(initialMessage)

  async function refetch () {
    const response = await fetch('/api/message')
    const json = (await response.json()) as { message: string }

    setMessage(json.message)
  }

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000)

    return () => { clearInterval(intervalId) }
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 break-words px-4">
      <h1 className="text-7xl font-bold">
        {message}
      </h1>

      <MyMessageEditor onSubmit={refetch} />
    </div>
  )
}
