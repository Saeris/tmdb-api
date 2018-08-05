import Winston, { format } from "winston"
import Sentry from "./sentry"

const { combine, colorize, timestamp, printf } = format

Winston.configure({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new Winston.transports.Console({
      level: process.env.ENV === `production` ? `error` : process.env.LOGLEVEL || `debug`
    }),
    new Sentry()
  ]
})

Winston.debug = (...args) => {
  for (const arg of args) {
    Winston.log(`debug`, arg)
  }
}

Winston.info = (...args) => {
  for (const arg of args) {
    Winston.log(`info`, arg)
  }
}

Winston.warn = (...args) => {
  for (const arg of args) {
    Winston.log(`warn`, arg)
  }
}

Winston.error = (...args) => {
  for (const arg of args) {
    Winston.log(`error`, arg)
  }
}
