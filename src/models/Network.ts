import { Country } from "./Country"
import { Logo } from "./Images"

export class Network {
  [key: string]: any
  id!: string

  // General Details
  name!: string
  country: Country
  headquarters!: string

  // Social
  homepage: URL

  // Media
  images!: Promise<Logo[]>

  constructor({ origin_country: country, homepage, ...rest }: Network) {
    Object.assign(this, rest)
    this.country = country
    this.homepage = new URL((homepage as unknown) as string)
  }
}
