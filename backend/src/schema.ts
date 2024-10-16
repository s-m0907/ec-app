const typeDefs = `#graphql

type Images {
  lqip: String
  alt_text: String
  thumbnail: String
  iiif_url: String
}

type Artwork {
    id: ID
    title: String
    artist: String
    medium: String
    date: String
    images: Images
    api: String
  }

  type ArtworkDetail {
    id: ID
    title: String
    artist: String
    medium: String
    date: String
    images: Images
    description: String
    place_of_origin: String
    dimensions: String
    is_on_view: Boolean
    location: String
    categories: [String]
    api: String
  }

  type Query {
    artworks(searchTerm: String, limit: Int, page: Int): [Artwork]
    artwork(id: String, api: String): ArtworkDetail
  }
`
export default typeDefs