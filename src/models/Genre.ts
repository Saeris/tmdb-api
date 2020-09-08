export class Genre {
  id!: string
  name!: string

  constructor(init: Genre) {
    Object.assign(this, init)
  }
}
