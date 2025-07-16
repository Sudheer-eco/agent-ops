'use client'

import { useState } from 'react'
import ChatMessage from '../../../components/ChatMessage'
import ChatInput from '../../../components/ChatInput'

interface Params {
  id: string
}

export default function TaskPage({ params }: { params: Params }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; message: string }[]>([])

  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { role: 'user', message: msg }])
    console.log('Send message, create chat ID if new:', params.id)
  }

  return (
    <div className="min-h-screen pb-24 px-4 flex flex-col">
      <div className="flex-1 pt-4 flex flex-col">
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} message={m.message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}
