export class SocialMedia {
  id!: string
  imdb: URL | null
  facebook: URL | null
  instagram: URL | null
  twitter: URL | null

  constructor({ imdb, facebook, instagram, twitter, ...rest }: SocialMedia) {
    Object.assign(this, rest)
    this.imdb = imdb ? new URL(`https://www.imdb.com/title/${imdb}/`) : null
    this.facebook = facebook
      ? new URL(`https://www.facebook.com/${facebook}`)
      : null
    this.instagram = instagram
      ? new URL(`https://instagram.com/${instagram}/`)
      : null
    this.twitter = twitter ? new URL(`https://twitter.com/${twitter}`) : null
  }
}
