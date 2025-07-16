import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  const { email, password } = req.body
  if (!email || !email.endsWith('@ecosleek.in')) {
    return res.status(400).json({ success: false, message: 'Email must end with @ecosleek.in' })
  }
  // password would be verified against DB in real implementation
  res.cookie('sb-user-email', email, { httpOnly: true })
  res.cookie('sb-access-token', 'dummy', { httpOnly: true })
  res.json({ success: true, message: 'Login successful' })
})

export default router
