import { Router, Request, Response } from 'express'
import OpenAI from 'openai'

const router = Router()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

router.post('/', async (req: Request, res: Response) => {
  const { code } = req.body
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI coding assistant.' },
        { role: 'user', content: `Explain the following code:\n\n${code}` }
      ]
    })
    const explanation = completion.choices[0].message.content || ''
    res.json({ explanation })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
