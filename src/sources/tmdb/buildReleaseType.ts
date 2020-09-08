import type { Logic } from "./types"

export type MovieReleaseStatus =
  | "Rumored"
  | "Planned"
  | "InProduction"
  | "PostProduction"
  | "Released"
  | "Canceled"

export type TVReleaseStatus =
  | "ReturningSeries"
  | "Planned"
  | "InProduction"
  | "Ended"
  | "Canceled"
  | "Pilot"

export interface ReleaseType {
  types: (MovieReleaseStatus | TVReleaseStatus)[]
  logic: Logic
}

export const buildReleaseType = (field: string, releaseType?: ReleaseType) => {
  const filter: { [key: string]: string } = {}
  if (releaseType) {
    if (releaseType.types) {
      filter[field] = releaseType.types.join(
        releaseType.logic
      )
    }
  }
  return filter
}
