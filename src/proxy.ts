import { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { isDev } from './utils'

export function useProxyMiddleware(app: Express) {
  app.use(
    createProxyMiddleware('/', {
      changeOrigin: true,
      cookieDomainRewrite: isDev() ? 'localhost' : 'humbly-cors.glitch.me',
      headers: {
        host: 'api-v3.igdb.com',
        origin: null,
        'user-key': process.env.IGDB_API_KEY,
      },
      logLevel: 'debug',
      onProxyReq: function (proxyReq, req, res) {
        console.log(proxyReq, req, res)
        proxyReq.setHeader('accept-encoding', 'application/json')
        proxyReq.setHeader('user-key', process.env.IGDB_API_KEY)
      },
      secure: false,
      target: 'api-v3.igdb.com',
    }),
  )
}
