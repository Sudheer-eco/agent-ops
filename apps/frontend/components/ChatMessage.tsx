interface ChatMessageProps {
  role: 'user' | 'assistant'
  message: string
}

export default function ChatMessage({ role, message }: ChatMessageProps) {
  const isUser = role === 'user'
  const bubbleClass = isUser ? 'bg-graybubble self-end' : 'bg-primary text-white self-start'

  return (
    <div className={`px-3 py-2 rounded-md max-w-xs mb-2 ${bubbleClass}`}>{message}</div>
  )
}
