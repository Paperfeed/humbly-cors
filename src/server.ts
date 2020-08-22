import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

import bodyParser from 'body-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
  '/',
  function (req, res, next) {
    if (req.headers['appid'] !== process.env.APP_ID) {
      res.status(401).send('Unauthorized')
    } else {
      next()
    }
  },
  createProxyMiddleware({
    changeOrigin: true,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'user-key': process.env.IGDB_API_KEY,
    },
    logLevel: 'debug',
    onProxyReq(proxyReq, req /*, res*/) {
      if (req.body instanceof Object) {
        proxyReq.write(JSON.stringify(req.body))
      }
    },
    onProxyRes(proxyRes /*, req, res*/) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },
    target: 'https://api-v3.igdb.com',
    ws: true,
  }),
)
app.use(bodyParser.json())

const port = 3000

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
