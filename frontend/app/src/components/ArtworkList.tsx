import styled from 'styled-components'
import ArtworkCard from './ArtworkCard'
import Modal from './Modal'
import { useState } from 'react'

const Grid = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 16px;
padding: 16px
`

interface ArtworkListProps {
  artworks: Record<string, any>[]
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks }) => {
const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleOpenModal = (item: any) => {
        setIsModalOpen(true)
      }
    
      const handleCloseModal = () => {
        setIsModalOpen(false)
      }

    return<>
    <Grid>
        {artworks.map((artwork: any) => {
            return <ArtworkCard key={artwork.id} artwork={artwork} onClick={() => handleOpenModal(artwork)}/>
        })}
    </Grid>
    {isModalOpen && (
    <Modal onClose={handleCloseModal}/>
)}
    </>
}

export default ArtworkList