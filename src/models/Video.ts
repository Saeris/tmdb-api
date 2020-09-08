export type VideoType = `Trailer` | `Teaser` | `Clip` | `Featurette`

export class Video {
  id!: string
  key!: string
  name!: string
  site!: string
  size!: 360 | 480 | 720 | 1080
  type!: VideoType

  constructor(init: Video) {
    Object.assign(this, init)
  }
}
