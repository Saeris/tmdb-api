import { inspect } from "util"
import { info } from "winston"

export const inspectObj = obj => inspect(obj, false, null, true)
export const logObj = obj => obj |> inspectObj |> info
export const tapObj = (label = ``) => obj => {
  obj |> inspectObj |> (x => info(...(label ? [label, x] : [x])))
  return obj
}

export default inspectObj
