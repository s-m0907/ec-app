export interface User {
  id: string;
  username?: string;
  email: string;
}

export interface Exhibition {
  id: string;
  exhibition_name: string;
  exhibition_artworks: Artwork[];
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  medium: string;
  date: string;
  images: {
    alt_text: string;
    iiif_url: string;
    copyright: string;
  };
  description?: string;
  place_of_origin?: string;
  dimensions?: string;
  is_on_view: boolean;
  location: string;
  gallery: string;
  categories?: [string];
  api: string;
}
