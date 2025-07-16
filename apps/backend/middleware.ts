import { Request, Response, NextFunction } from 'express'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/api/auth/login') return next()
  const email = req.cookies['sb-user-email'] as string | undefined
  const token = req.cookies['sb-access-token']
  if (email && email.endsWith('@ecosleek.in') && token) {
    return next()
  }
  res.redirect('/unauthorized')
}
