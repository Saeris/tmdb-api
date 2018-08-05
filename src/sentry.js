import Transport from "winston-transport"
import { LEVEL } from "triple-beam"
import Raven from "raven"

export default class Sentry extends Transport {
  levelsMap = {
    silly: `debug`,
    verbose: `debug`,
    info: `info`,
    debug: `debug`,
    warn: `warning`,
    error: `error`
  }

  log({ [LEVEL]: level, message, ...rest }, callback) { // eslint-disable-line
    setImmediate(() => this.emit(`logged`, { level, message, ...rest }))
    const context = {
      logger: rest.label || `Winston`,
      level: this.levelsMap[level],
      message,
      extra: rest
    }

    if (level === `error` || level === `fatal`) {
      Raven.captureException(message, context)
    } else {
      Raven.captureMessage(message, context)
    }

    if (callback) setImmediate(callback)
  }

  normalizeExtra(msg, meta) {
    const extra = {}

    if (msg instanceof Error) extra.err = { stack: msg.stack, message: msg.message }

    return Object.assign(extra, meta)
  }

  normalizeMessage = msg => (msg instanceof Error ? msg : msg.message)
}
