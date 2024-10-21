export interface ArtworkId {
  api: string;
  artwork_id: string;
  iiif: string;
}

export interface Exhibition {
  id: string;
  exhibition_name: string;
  artwork_ids: ArtworkId[];
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  medium: string;
  date: string;
  images: {
    lqip: string;
    alt_text: string;
    thumbnail: string;
    iiif_url: string;
    copyright: string;
  };
  description: string;
  place_of_origin: string;
  dimensions: string;
  is_on_view: boolean;
  location: string;
  gallery: string;
  categories: [string];
  api: string;
}
