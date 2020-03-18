import { inspect } from "util"

export const inspectObj = (obj: Record<any, any>) =>
  inspect(obj, false, null, true)
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

export default inspectObj
