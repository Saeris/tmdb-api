import { GraphQLResolveInfo } from "graphql";
import { Context } from "../server";
import { Sources } from "../sources";

export type Resolver<Parent = any, Args = any, Return = any> = (
  parent: Parent,
  args: Args,
  ctx: Context & {
    dataSources: Sources;
  },
  info: GraphQLResolveInfo
) => Return;
