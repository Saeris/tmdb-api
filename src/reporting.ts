import type { Logger } from "winston"
import winston, { createLogger, format } from "winston"
import chalk from "chalk"
import colorize from "json-colorizer"

type SetupReporting = (options?: {
  level?: "debug" | "info" | "warn" | "error"
  transports?: winston.transport[]
}) => Logger

const defaults = {
  level: `info`,
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.timestamp({
          format: `H:mm:ss.SSS a`
        }),
        format.json(),
        format.printf(({ level: lvl, message, timestamp, meta }) => {
          const label = chalk.white.bgMagentaBright(`[TMDB-API]`)
          const time = chalk.cyan.dim(`[${String(timestamp)}]`)
          const levels = {
            debug: chalk.blue(`debug`),
            info: chalk.green(`info`),
            warn: chalk.yellow(`warn`),
            error: chalk.red(`error`)
          }
          const json =
            !!meta && typeof meta === `object`
              ? `\n${colorize(meta, { pretty: true })}`
              : ``
          return `${label} ${time} ${
            levels[lvl as keyof typeof levels]
          } - ${message}${json}`
        })
      )
    })
  ]
}

export const setupReporting: SetupReporting = ({
  level = defaults.level,
  transports = defaults.transports
} = {}) => {
  const logger = createLogger({
    level,
    transports
  })

  return logger
}
