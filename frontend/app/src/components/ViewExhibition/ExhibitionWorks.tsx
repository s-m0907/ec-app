import styled from 'styled-components'
import Modal from '../Common/Modal'
import { useEffect, useState } from 'react'
import useModal from '../../hooks/useModal'
import ArtworkDetail from './ArtworkDetail'
import ArtworkCard from '../Artwork/ArtworkCard'
import { ArtworkId } from '../../firebase'
import { gql, useApolloClient, useQuery } from '@apollo/client'

const Grid = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 16px;
padding: 16px
`

interface ExhibitionWorksProps {
  artwork_ids: ArtworkId[]
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

const GET_ARTWORK = gql`
query Artwork($artworkId: String, $api: String) {
  artwork(id: $artworkId, api: $api) {
    id
    title
    artist
    medium
    date
    images {
      lqip
      alt_text
      thumbnail
      iiif_url
    }
    description
    place_of_origin
    dimensions
    is_on_view
    location
    categories
    api
  }
}
`

const ExhibitionWorks: React.FC<ExhibitionWorksProps> = ({ artwork_ids }) => {
  const client = useApolloClient()
  const [artworks, setArtworks] = useState<ArtworkDetail[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const { open, isOpen, close } = useModal();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchArtworks = async () => {
      if (artwork_ids.length === 0) {
        setArtworks([])
        return
      }

      const artworkPromises = artwork_ids.map(async (artwork_id) => {
        try {
          const { data } = await client.query({
            query: GET_ARTWORK,
            variables: { artworkId: artwork_id.artwork_id, api: artwork_id.api },
          });
          return data.artwork;
        } catch (error) {
          console.error('Error fetching details: ', error);
          return null
        }
      });

      const fetchedArtworks = await Promise.all(artworkPromises);
      
      setArtworks(fetchedArtworks.filter((artwork) => artwork !== null));
      setIsLoading(false)
    };

    fetchArtworks();
  }, [artwork_ids])

  const handleOpenModal = (artwork: any) => {
    setSelectedArtwork(artwork);
    open()
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
        <>
          <Grid>
            {artworks.map((artwork: any) => (
              <ArtworkCard 
                key={artwork.id} 
                artwork={artwork} 
                onClick={() => handleOpenModal(artwork)} 
                variant={'exhibition'} 
              />
            ))}
          </Grid>
          <Modal
            isOpen={isOpen}
            close={close}
            content={<ArtworkDetail selectedArtwork={selectedArtwork} />}
          />
        </>
      )}

export default ExhibitionWorks