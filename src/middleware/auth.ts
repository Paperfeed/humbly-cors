import { RequestHandler } from 'express'

export const useAuth: RequestHandler = (req, res, next) => {
  if (req.headers['appid'] !== process.env.APP_ID) {
    res.status(401).send('Unauthorized')
  } else {
    next()
  }
}
