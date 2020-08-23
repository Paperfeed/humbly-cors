import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

import bodyParser from 'body-parser'

import { useAuth } from './middleware/auth'
import { useIGDBProxy, useSteamProxy } from './middleware/proxy'
import { isDev } from './utils'

const app = express()

// Add proxy to Steam API
app.use(
  '/steam',
  ...[isDev() ? useAuth : undefined, useSteamProxy()].filter(i => Boolean(i)),
)

// Add proxy to IGDB API
app.use(
  '/',
  ...[isDev() ? useAuth : undefined, useIGDBProxy()].filter(i => Boolean(i)),
)

app.use(bodyParser.json())

const port = 3000

app.listen(port, () => {
  console.log(
    isDev()
      ? `Server started at http://localhost:${port}`
      : `Server started at https://humbly-cors.glitch.me`,
  )
})
