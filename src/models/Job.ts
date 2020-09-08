export class Job {
  [key: string]: any
  department!: string
  name!: string

  constructor(init: Job) {
    Object.assign(this, init)
  }
}
