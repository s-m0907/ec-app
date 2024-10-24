const typeDefs = `#graphql

type ArtworksResponse {
  artworks: [Artwork]
  aicTotalCount: Int
  vaTotalCount: Int
}

type Images {
  alt_text: String
  iiif_url: String
  copyright: String
}

  type Artwork {
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
    gallery: String
    location: String
    categories: [String]
    api: String
  }

  type Query {
    artworks(searchTerm: String, limit: Int, page: Int): ArtworksResponse
    artwork(id: String, api: String): Artwork
  }
`
export default typeDefs