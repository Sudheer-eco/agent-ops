import { Router, Request, Response } from 'express'
import { supabase } from '../../../packages/db'
import OpenAI from 'openai'

const router = Router()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

router.post('/', async (req: Request, res: Response) => {

  const { task_id, user_id, message } = req.body
  const { data: history, error } = await supabase
    .from('messages')
    .select('role, content')
    .eq('task_id', task_id)
    .order('id', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })

  const messages = [
    { role: 'system' as const, content: 'You are an AI coding assistant.' },
    ...(history || []),
    { role: 'user' as const, content: message }
  ]

  try {
    const completion = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', messages })
    const reply = completion.choices[0].message.content || ''

    await supabase.from('messages').insert([
      { task_id, user_id, content: message, role: 'user' },
      { task_id, user_id, content: reply, role: 'assistant' }
    ])
    res.json({ role: 'assistant', content: reply })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
