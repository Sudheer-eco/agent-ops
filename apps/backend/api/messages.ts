import { Router } from 'express'
import { supabase } from '../../packages/db'

const router = Router()

router.post('/', async (req, res) => {
  const { task_id, user_id, content, role } = req.body
  const { error } = await supabase.from('messages').insert({ task_id, user_id, content, role })
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
