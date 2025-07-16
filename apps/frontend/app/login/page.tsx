'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.endsWith('@ecosleek.in')) {
      setError('Email must end with @ecosleek.in')
      return
    }
    setError('')
    await new Promise((res) => setTimeout(res, 500))
    router.push('/task/new')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded-lg shadow-md space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  )
}
