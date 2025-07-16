import express from 'express'
import cookieParser from 'cookie-parser'
import authLogin from './api/auth/login'
import messages from './api/messages'
import gpt from './api/gpt'
import taskSnippets from './api/tasks/[id]/snippets'
import explain from './api/snippets/explain'
import label from './api/snippets/label'
import { authMiddleware } from './middleware'

import fs from 'fs'
import path from 'path'
import { supabase } from '../packages/db'

async function runMigrations() {
  try {
    const sql = fs.readFileSync(path.resolve(__dirname, '../packages/db/migrations/init.sql'), 'utf8')
    await supabase.rpc('execute_sql', { sql })
  } catch (err) {
    console.error('Migration error', err)
  }
}


const app = express()
app.use(express.json())
app.use(cookieParser())


runMigrations()


app.use('/api/auth/login', authLogin)
app.use(authMiddleware)
app.use('/api/messages', messages)
app.use('/api/gpt', gpt)
app.use('/api/tasks', taskSnippets)
app.use('/api/snippets/explain', explain)
app.use('/api/snippets/label', label)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Backend listening on ${port}`))
