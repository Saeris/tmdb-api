export const getReview = `query getReview {
  review(id: "5488c29bc3a3686f4a00004a") {
    id
    author
    content
    language {
      code
      name
    }
    media {
      ... on Movie {
        id
        name
        overview
      }
      ... on TV {
        id
        name
        overview
      }
    }
  }
}`
