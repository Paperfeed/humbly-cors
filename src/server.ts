import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
  '/',
  createProxyMiddleware({
    changeOrigin: true,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'user-key': process.env.IGDB_API_KEY,
    },
    logLevel: 'debug',
    onProxyReq(proxyReq, req, res) {
      console.log('[Received Request]', res)
    },
    onProxyRes(proxyRes, req, res) {
      console.log(req.body)
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },
    target: 'https://api-v3.igdb.com',
    ws: true,
  }),
)

const port = 3000

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
