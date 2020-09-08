import { GraphQLResolveInfo } from "graphql"
import { Context } from "../../server"
import { Sources } from "../../sources"

export type Extends<T, U extends T> = U

export type Instantiable<T> = { new (...args: T[]): T }

export type Model<
  T extends keyof Context["models"] = keyof Context["models"]
> = ReturnType<Context["models"][T]>

export type Resolver<
  Parent = Model<keyof Context["models"]>,
  Args = Record<any, any>,
  Return = Promise<Model<keyof Context["models"]>>
> = (
  parent: Parent,
  args: Args,
  ctx: Context & {
    dataSources: Sources
  },
  info: GraphQLResolveInfo
) => Return
