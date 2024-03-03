'use client'

import { type SyntheticEvent, useState } from 'react'

export function MyMessageEditor ({ onSubmit }: {
  onSubmit?: () => void
}) {
  const [message, setMessage] = useState('')

  async function handleSubmit (event: SyntheticEvent) {
    event.preventDefault()

    const body = { message }

    await fetch('/api/message', {
      method: 'post',
      body: JSON.stringify(body),
    })

    onSubmit?.()
  }

  return (
    <form className="flex items-start gap-4 text-xl" onSubmit={handleSubmit}>
      <input
        className="inline-block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        type="text"
        value={message}
        onChange={(event) => { setMessage(event.target.value) }}
      />

      <button className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 ">
        發射
      </button>
    </form>
  )
}
