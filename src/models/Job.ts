export class Job {
  // eslint-disable-next-line no-undef
  [key: string]: any
  department!: string
  name!: string

  constructor(init: Job) {
    Object.assign(this, init)
  }
}
