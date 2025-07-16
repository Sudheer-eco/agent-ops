import Link from 'next/link'
import Button from '../components/Button'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">Ecosleek Dev Assistant</h1>
        <p className="text-gray-500 mb-6">AI-powered memory-based coding assistant</p>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </main>
  )
}
