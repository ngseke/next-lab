import Link from 'next/link'

export default async function Home () {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-6 font-mono">
      <Link
        href="/message"
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >/message</Link>
    </main>
  )
}
