import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  async function setWebhook() {
    const deleting = await fetch("https://api.telegram.org/bot8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg/deleteWebhook")
    const set = await fetch("https://api.telegram.org/bot8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg/setWebhook?url=https://coinrush.pages.dev/api/webhook&max_connections=100")

    const response = await fetch("https://api.telegram.org/bot8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg/getWebhookInfo")
    return response.json()
  }

  const ret = await setWebhook();
  return NextResponse.json(ret);
}
export async function POST(request: NextRequest) {
  function apiUrl(methodName: string, params: any | null = null): string {
    let query = ''
    if (params) {
      query = '?' + new URLSearchParams(params as any).toString()
    }
    return `https://api.telegram.org/bot8101809542:AAGvcWjsRCqF6EAqISEQItPk98u9noqfNzg/${methodName}${query}`
  }
  async function sendMessage(chatId: number, text: string) {
    const response = await fetch(apiUrl('sendMessage', { chat_id: chatId, text }))
    return response.json()
  }
  async function editMessageText(chat_id: number, message_id: number, text: string) {
    const response = await fetch(apiUrl('editMessageText', { chat_id, message_id, text }))
    return response.json()
  }
  async function answerCallbackQuery(callback_query_id: any) {
    const response = await fetch(apiUrl('answerCallbackQuery', { callback_query_id }))
    return response.json()
  }
  function isNumber(value: any): boolean {
    return typeof value === 'number'
  }
  async function onStart(chatId: number, refers: number) {
    const response = await fetch(
      apiUrl('sendMessage', {
        chat_id: chatId,
        text: 'Welcome to CoinRush',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Join Comunnity', url: 'https://t.me/free_airdrop_hk' }],
            [{ text: 'Open App', url: refers===0? `https://t.me/coinrushofficial_bot/app`: `https://t.me/coinrushofficial_bot/app?startapp=${refers}&mode=Fullsize` }],
          ],
        }),
      }),
    )
  }

  async function onUpdate(params: string, update: any) {
    if (params === 'message') {
      const chatId = update.chat.id
      const text = update.text || update.caption || ''
      if (text.startsWith('/start')) {
        const parts = text.split(' ')
        if (parts.length > 1) {
          const number = parts[1]
          if (isNumber(number)) {
            await onStart(chatId, number)
          }
        } 
        await onStart(chatId, 0)
      }
    } else if (params === 'callback_query') {
      const chatId = update.message?.chat.id
      const messageId = update.message?.message_id
      const data = update.data
      if (data) {
        if (chatId && messageId) {
          await editMessageText(chatId, messageId, `You selected option ${data}`)
          await answerCallbackQuery(update.id)
        }
      }
    }
  }
  try {
    const update: any = await request.json()
    if (update.message) {
      await onUpdate('message', update.message)
    } else if (update.callback_query) {
      await onUpdate('callback_query', update.callback_query)
    }
    return NextResponse.json('update')
  } catch (e: any) {
    return NextResponse.json('post: data ')
  }
}
