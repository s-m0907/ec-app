import styled from 'styled-components'
import ArtworkCard from './ArtworkCard'
import Modal from '../Common/Modal'
import { useState } from 'react'
import AddArtwork from './AddArtwork'
import useModal from '../../hooks/useModal'

const Grid = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 16px;
padding: 16px
`

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


interface ArtworkListProps {
  artworks: Artwork[]
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks }) => {
const [selectedArtwork, setSelectedArtwork] = useState({})
const { open, isOpen, close } = useModal()

    const handleOpenModal = (artwork: any) => {
      setSelectedArtwork(artwork)
      open()
      }


    return<>
    <Grid>
        {artworks.map((artwork: any) => {
            return <ArtworkCard key={artwork.id} artwork={artwork} onClick={() => handleOpenModal(artwork)} variant={'browse'}/>
        })}
    </Grid>
    <Modal isOpen={isOpen} close={close} content={<AddArtwork selectedArtwork={selectedArtwork} onClose={close} />} />
    </>
}

export default ArtworkList