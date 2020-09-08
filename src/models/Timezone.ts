export class Timezone {
  code: string
  zone: string

  constructor({ code, zone }: Timezone) {
    this.code = code
    this.zone = zone
  }
}
