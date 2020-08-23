import { RequestHandler } from 'express'

const crypto = require('crypto')
const { execSync } = require('child_process')

export const useWebhook: RequestHandler = (req, res) => {
  const hmac = crypto.createHmac('sha1', process.env.GIT_SECRET)
  const sig = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex')
  if (
    req.headers['x-github-event'] === 'push' &&
    crypto.timingSafeEqual(
      Buffer.from(sig),
      Buffer.from(req.headers['x-hub-signature']),
    )
  ) {
    res.sendStatus(200)
    const commands = [
      'git fetch origin master',
      'git reset --hard origin/master',
      'git pull origin master --force',
      'npm install',
      // Extra build commands here
      'refresh', // fixes glitch ui
    ]

    for (const cmd of commands) {
      console.log(execSync(cmd).toString())
    }

    console.log('Updated with origin/master!')
    return
  } else {
    console.log('Webhook signature incorrect!')
    return res.sendStatus(403)
  }
}
