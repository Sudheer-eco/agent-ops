'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from '../../../components/ChatMessage'
import ChatInput from '../../../components/ChatInput'

interface Params {
  id: string
}

export default function TaskPage({ params }: { params: Params }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; message: string }[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { role: 'user', message: msg }])

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ task_id: params.id, content: msg, role: 'user' })
    })

    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ task_id: params.id, message: msg })
    })
    const data = await res.json()
    if (data.role === 'assistant') {
      setMessages((prev) => [...prev, { role: 'assistant', message: data.content }])
    }
  }

  return (
    <div className="min-h-screen pb-24 px-4 flex flex-col">
      <div className="flex-1 pt-4 flex flex-col">
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} message={m.message} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}
