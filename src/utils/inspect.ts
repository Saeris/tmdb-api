import { inspect } from "util"

export const inspectObj = <T = Record<string, unknown>>(obj: T): string =>
  inspect(obj, false, null)

export const logObj = <T = Record<string, unknown>>(obj: T): void =>
  // eslint-disable-next-line no-console
  console.info(inspectObj(obj))

export const tapObj =
  (label = ``) =>
  <T = Record<string, unknown>>(obj: T): T => {
    const inspectResult = inspectObj(obj)
    const args: string[] = label ? [label, inspectResult] : [inspectResult]
    if (args.length) {
      // eslint-disable-next-line no-console
      console.info(...args)
    }
    return obj
  }

class TraceError extends Error {
  discarded!: Error

  constructor() {
    super()
    const oldStackTrace = Error.prepareStackTrace
    try {
      Error.prepareStackTrace = (
        err,
        structuredStackTrace
        // eslint-disable-next-line no-undef
      ): NodeJS.CallSite[] => {
        this.discarded = err
        return structuredStackTrace
      }
      Error.captureStackTrace(this)
      this.stack
    } finally {
      Error.prepareStackTrace = oldStackTrace
    }
  }
}

export const logArgs =
  <A extends unknown[], T extends (...args: A) => ReturnType<T>>(fn: T) =>
  (...args: A): ReturnType<T> => {
    try {
      throw new TraceError()
    } catch (err: unknown) {
      // eslint-disable-next-line no-undef
      const { stack } = err as { stack: NodeJS.CallSite[] }
      const callsite = stack[1]
      // eslint-disable-next-line no-console
      console.info({
        function: `${
          callsite.getFunctionName() ??
          `${String(callsite.getTypeName())}.${String(
            callsite.getMethodName()
          )}`
        }`,
        location: callsite.getFileName(),
        args
      })
    }
    return fn(...args)
  }
