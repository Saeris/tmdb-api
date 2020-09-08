import {
  Cast,
  Crew,
  Credit,
  Person,
  Movie,
  TV,
  Season,
  Episode
} from "../../models"

type credits = {
  cast: Cast[]
  crew: Crew[]
  guests?: Cast[]
}

export const mapToCredits = (
  { cast, crew, guests }: credits,
  parent: Movie | TV | Season | Episode | Person
): Record<string, Credit[]> => {
  const toCredit = (member: Cast | Crew) =>
    new Credit({
      id: member.credit_id,
      credit_type: typeof member?.character === `string` ? `cast` : `crew`,
      ...(parent instanceof Person
        ? {
            media_type: member.media_type,
            person: parent as Person,
            media: { id: member.id }
          }
        : {
            media_type: parent.media_type,
            person: { id: member.id },
            media:
              parent instanceof Movie || TV
                ? (parent as Movie | TV)
                : (parent as Season | Episode).series
          }),
      role:
        typeof member?.character === `string`
          ? new Cast({
              credit_id: member.credit_id,
              character: member.character
            } as Cast)
          : new Crew({
              credit_id: member.credit_id,
              job: member.job,
              department: member.department
            } as Crew)
    })
  return {
    cast: cast.map(toCredit),
    crew: crew.map(toCredit),
    ...(guests
      ? {
          guests: guests?.map(toCredit)
        }
      : {})
  }
}
