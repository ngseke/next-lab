import { store } from '@/modules/store'

export async function GET () {
  return Response.json({
    message: store.message,
  })
}

export async function POST (request: Request) {
  const json = await request.json()
  const { message } = json

  if (message?.length > 1000) {
    return new Response(null, { status: 400 })
  }

  store.message = message

  return new Response(null, { status: 204 })
}
