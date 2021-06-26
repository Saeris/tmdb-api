import type { GraphQLResolveInfo } from "graphql"
import type { Context } from "../../server"
import type { Sources } from "../../sources"

export type Extends<T, U extends T> = U

export interface Instantiable<T> {
  new (...args: T[]): T
}

export type Model<T extends keyof Context["models"] = keyof Context["models"]> =
  ReturnType<Context["models"][T]>

export type Resolver<
  Parent = Model,
  Args = Record<any, any>,
  Return = Promise<Model>
> = (
  parent: Parent,
  args: Args,
  ctx: Context & {
    dataSources: Sources
  },
  info: GraphQLResolveInfo
) => Return
