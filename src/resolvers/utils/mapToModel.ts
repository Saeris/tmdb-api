import type { Context } from "../../server"
import type { Instantiable } from "./types"

export const mapToModel = <
  T extends ReturnType<Context["models"][keyof Context["models"]]>,
  M extends Instantiable<T>
>(
  arr: T[],
  Model: M
): T[] => arr.map((m) => new Model(m))
