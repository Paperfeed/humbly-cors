import dotenv from 'dotenv'
import express from 'express'
import http from 'http'

dotenv.config()

import bodyParser from 'body-parser'

import { useAuth } from './middleware/auth'
import { useIGDBProxy, useSteamProxy } from './middleware/proxy'
import { useWebhook } from './middleware/webhook'
import { isDev } from './utils'

const app = express()

// Keep app awake
app.get('/heartbeat', (req, res) => {
  console.log(Date.now() + ' Heart is beating')
  res.sendStatus(200)
})

// Add proxy to Steam API
app.use(
  '/steam',
  ...[isDev() ? useAuth : undefined, useSteamProxy()].filter(i => Boolean(i)),
)

// Add proxy to IGDB API
app.use(
  /\/((?!git).)*/,
  ...[isDev() ? useAuth : undefined, useIGDBProxy()].filter(i => Boolean(i)),
)

app.use(bodyParser.json())

// Add Git Webhook to automatically pull newest changes to Glitch
app.post('/git', useWebhook)

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 180000)

const port = 3000
app.listen(port, () => {
  console.log(
    isDev()
      ? `Server started at http://localhost:${port}`
      : `Server started at https://humbly-cors.glitch.me`,
  )
})
