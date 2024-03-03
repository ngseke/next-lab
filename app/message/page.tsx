import { MyMessage } from '@/components/MyMessage'
import { store } from '@/modules/store'

export default async function Home () {
  const { message } = store

  return (
    <MyMessage initialMessage={message} />
  )
}
