import { Resolver } from "../resolvers/utils"
import { Credit } from "./Credit"

export class Cast {
  // eslint-disable-next-line no-undef
  [key: string]: any
  // eslint-disable-next-line camelcase
  credit_type?: string = `cast`
  static credit: Resolver<Cast, {}, Promise<Credit>> = (
    { credit_id: id },
    { ...rest },
    { dataSources },
    info
  ) => dataSources.TMDB.credit({ id, ...rest }, info)

  character!: string

  constructor(init: Cast) {
    Object.assign(this, init)
  }
}
