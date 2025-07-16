import { Router } from 'express'
import { Configuration, OpenAIApi } from 'openai'

const router = Router()
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))

router.post('/', async (req, res) => {
  const { code } = req.body
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI coding assistant.' },
        { role: 'user', content: `Explain the following code:\n\n${code}` }
      ]
    })
    const explanation = completion.data.choices[0].message?.content || ''
    res.json({ explanation })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
