import { createProxyMiddleware } from 'http-proxy-middleware'

export function useProxyMiddleware(app: any) {
  app.use(
    createProxyMiddleware('/', {
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      headers: {
        host: 'www.speedtest.net',
        origin: null,
        'user-key': process.env.IGDB_API_KEY,
      },
      logLevel: 'debug',
      onProxyReq: function (proxyReq: any, req: any, res: any) {
        console.log(proxyReq, req, res)
        proxyReq.setHeader('accept-encoding', 'application/json')
        proxyReq.setHeader('user-key', 'identity')
      },
      secure: false,
      target: 'www.speedtest.net',
    }),
  )

  // app.use(
  //   proxy('/*.html', {
  //     changeOrigin: true,
  //     secure: false,
  //     target: 'https://secure.gooddata.com',
  //   }),
  // )
  //
  // app.use(
  //   proxy('/packages/*.{js,css}', {
  //     changeOrigin: true,
  //     secure: false,
  //     target: 'https://secure.gooddata.com',
  //   }),
  // )
}
