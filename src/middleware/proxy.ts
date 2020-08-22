import { createProxyMiddleware } from 'http-proxy-middleware'

const injectApiKey = (path: string, query: string) => {
  const queryIndex = path.indexOf('?')
  if (queryIndex >= 0) {
    return `${path.slice(0, queryIndex)}?${query}&${path.slice(
      queryIndex + 1,
      path.length,
    )}`
  } else {
    return `${path}?${query}`
  }
}

export const useSteamProxy = () =>
  createProxyMiddleware({
    changeOrigin: true,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    logLevel: 'debug',
    onProxyRes(proxyRes /*, req, res*/) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    },

    pathRewrite: (path /*, req*/) => {
      let newPath = ''

      if (/steam\/getOwnedGames/.test(path)) {
        newPath = path.replace(
          /steam\/getOwnedGames/,
          'IPlayerService/GetOwnedGames/v0001',
        )
      }

      if (newPath !== path) {
        console.log(`[HPM] Replaced ${path} -> ${newPath}`)
        return injectApiKey(
          newPath,
          `key=${process.env.STEAM_API_KEY}&format=json`,
        )
      }
      return path
    },
    target: 'http://api.steampowered.com',
    ws: true,
  })

export const useIGDBProxy = () =>
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
  })
