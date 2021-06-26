import type { Resolver } from "../resolvers/utils"
import { createNullable, mapToModel } from "../resolvers/utils"
import type { Country } from "./Country"
import { Logo } from "./Images"

export class Company {
  // eslint-disable-next-line no-undef
  [key: string]: any
  id!: string

  // General Details
  name!: string
  description!: string
  country: Country
  headquarters!: string
  parentCompany!: Promise<Company>

  // Social
  homepage: URL

  // Media
  logo: Logo | null
  static images: Resolver<Company, {}, Promise<Logo[]>> = async (
    { id },
    args,
    { dataSources },
    info
  ) =>
    mapToModel(
      await dataSources.TMDB.companyImages({ id, ...args }, info),
      Logo
    )

  constructor({
    origin_country: country,
    homepage,
    logo_path: logo,
    ...rest
  }: Company) {
    Object.assign(this, rest)
    this.country = country
    this.homepage = new URL(homepage as unknown as string)
    this.logo = createNullable(logo, Logo)
  }
}
