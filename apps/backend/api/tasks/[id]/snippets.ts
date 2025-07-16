import { Router, Request, Response } from 'express'
import { supabase } from '../../../../../packages/db'

const router = Router()

router.get('/:id/snippets', async (req: Request, res: Response) => {
  const { id } = req.params
  const { data, error } = await supabase.from('snippets').select('*').eq('task_id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router
