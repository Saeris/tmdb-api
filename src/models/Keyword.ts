export class Keyword {
  id!: string
  name!: string

  constructor(init: Keyword) {
    Object.assign(this, init)
  }
}
