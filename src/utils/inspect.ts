import { inspect } from "util"

export const inspectObj = (obj: Record<any, any>) => inspect(obj, false, null)

// eslint-disable-next-line no-console
export const logObj = (obj: Record<any, any>) => console.info(inspectObj(obj))

export const tapObj = (label = ``) => (obj: Record<any, any>) => {
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
      Error.prepareStackTrace = (err, structuredStackTrace) => {
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

export const logArgs = <
  A extends any[],
  T extends (...args: A) => ReturnType<T>
>(
  fn: T
) => (...args: A): ReturnType<T> => {
  try {
    throw new TraceError()
  } catch (err) {
    // eslint-disable-next-line no-undef
    const { stack }: { stack: NodeJS.CallSite[] } = err
    const callsite = stack[1]
    // eslint-disable-next-line no-console
    console.info({
      function: `${
        callsite.getFunctionName() ||
        `${callsite.getTypeName()}.${callsite.getMethodName()}`
      }`,
      location: callsite.getFileName(),
      args
    })
  }
  return fn(...args)
}
