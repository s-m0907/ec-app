import styled from 'styled-components'

import Modal from '../Common/Modal'
import { useState } from 'react'

import useModal from '../../hooks/useModal'
import ArtworkDetail from './ArtworkDetail'
import ArtworkCard from '../Artwork/ArtworkCard'

const Grid = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 16px;
padding: 16px
`

interface ExhibitionWorksProps {
  artworks: Record<string, any>[]
}

const ExhibitionWorks: React.FC<ExhibitionWorksProps> = ({ artworks }) => {
const [selectedArtwork, setSelectedArtwork] = useState({})
const { open, isOpen, close } = useModal()

    const handleOpenModal = (artwork: any) => {
      setSelectedArtwork(artwork)
      open()
      }


    return<>
    <Grid>
        {artworks.map((artwork: any) => {
            return <ArtworkCard key={artwork.id} artwork={artwork} onClick={() => handleOpenModal(artwork)} variant={'exhibition'}/>
        })}
    </Grid>
    <Modal isOpen={isOpen} close={close} content={<ArtworkDetail selectedArtwork={selectedArtwork}/>} />
    </>
}

export default ExhibitionWorks