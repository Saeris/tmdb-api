import { Country } from "./Country"
import { Language } from "./Language"

export class Account {
  [key: string]: any
  id!: string
  name!: string
  username!: string
  avatar: string
  language!: Promise<Language>
  country!: Promise<Country>
  includeAdult: boolean

  constructor({ avatar, include_adult: includeAdult, ...rest }: Account) {
    Object.assign(this, rest)
    this.avatar = `https://secure.gravatar.com/avatar/${
      ((avatar as unknown) as { gravatar: { hash: string } }).gravatar.hash
    }.jpg`
    this.includeAdult = includeAdult
  }
}
