import './globals.css'
import { Roboto } from 'next/font/google'
import type { ReactNode } from 'react'

const roboto = Roboto({ subsets: ['latin'], weight: ['400','700'], variable: '--font-roboto' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  )
}
