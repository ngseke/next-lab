import { useEffect, useState } from 'react'

export function Hook1 () {
  const [count, setCount] = useState(0)

  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage(`Count is ${count}`)
    console.log('useEffect 1')
  }, [count])

  useEffect(() => {
    setMessage(`COUNT BE ${count}!!`)
    console.log('useEffect 2')
  }, [count])

  console.log('message:', message)

  return (
    <div className="flex flex-col items-start gap-4 border p-4">
      <div>
        see console
      </div>

      <button
        type="button"
        className="rounded-lg bg-neutral-100 p-2"
        onClick={() => { setCount(count + 1) }}
      >add</button>

      <code>{count}</code>
      <code>{message}</code>
    </div>
  )
}
