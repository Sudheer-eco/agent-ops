import { Router, Request, Response } from 'express'
import { supabase } from '../../../../packages/db'

const router = Router()

router.post('/', async (req: Request, res: Response) => {

  const { id, label } = req.body
  const { error } = await supabase.from('snippets').update({ label }).eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
