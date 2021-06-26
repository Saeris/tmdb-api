import type { Context } from "../../server"
import type { Instantiable } from "./types"

export const createNullable = <
  T extends ReturnType<Context["models"][keyof Context["models"]]>,
  M extends Instantiable<T>
>(
  init: T,
  Model: M
): T | null => (init ? new Model(init) : null)
