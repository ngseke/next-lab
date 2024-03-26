import Link from 'next/link'

export default async function Home () {
  const links = ['/dnd', '/tiptap']

  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col justify-center gap-6 font-mono">
      <h1 className="text-5xl font-black">
        Next Lab
      </h1>
      {links.map((link) => (
        <Link
          key={link}
          href={link}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >{link}</Link>
      ))}
    </main>
  )
}
