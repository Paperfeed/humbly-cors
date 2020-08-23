import { RequestHandler } from 'express'

/**
 * Auth system that checks the headers against an AppId that must match
 *
 * Very rudimentary and not really safe,
 * but this API services a Chrome extension where all the code is out in the open.
 */
export const useAuth: RequestHandler = (req, res, next) => {
  if (req.headers['appid'] !== process.env.APP_ID) {
    res.status(401).send('Unauthorized')
  } else {
    next()
  }
}
