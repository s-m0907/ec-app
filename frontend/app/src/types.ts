export interface ArtworkId {
    api: string
    artwork_id: string
    iiif: string
  }
  
  export interface Exhibition {
    id: string
    exhibition_name: string
    artwork_ids: ArtworkId[]
  }

export interface Artwork {
    id: string | number
    title: string
    artist: string
    medium: string
    date: string
    images: {
      lqip: string
      alt_text: string
      thumbnail: string
      iiif_url: string
    }
    api: string
  }

  export interface ArtworkDetail {
    id: string
    title: string
    artist: string
    medium: string
    date: string
    images: {
      lqip: string
      alt_text: string
      thumbnail: string
      iiif_url: string
    }
    description: string
    place_of_origin: string
    dimensions: string
    is_on_view: boolean
    location: string
    categories: [string]
    api: string
  }