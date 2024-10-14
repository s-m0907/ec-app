const typeDefs = `#graphql

type Images {
  lqip: String
  alt_text: String
  thumbnail: String
  iiif_url: String
}

type Artwork {
    id: ID!
    title: String
    artist: String
    medium: String
    date: String
    images: Images
  }

  type Query {
    artworks: [Artwork]
    searchArtworks(searchTerm: String): [Artwork]
  }
`

export default typeDefs