import styled from 'styled-components'
import Button from '../Common/Button'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Artwork, ArtworkDetail } from '../../types'

const Container = styled.div`
flex: 1 1 calc(25% - 16px);
padding: 16px;
display: flex;
flex-direction: column;
justify-content: flex-start;
font-family: futura;

@media(max-width: 1200px) {
    flex: 1 1 calc(33.33% - 16px);
}
 
@media (max-width: 800px) {
    flex: 1 1 calc(50% - 16px);
}

@media(max-width: 480px) {
    flex: 1 1 100%;
}
`
const Img = styled.img`
max-width: 100%`


interface ArtworkCardProps {
    artwork: Artwork | ArtworkDetail
    onClick: () => void
    variant: string
  }

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, variant }) => {

return (
    <Container>
         {artwork.images.iiif_url && <Img src={artwork.images.iiif_url || 'Loading'} alt={artwork.images.alt_text || 'Artwork Image'}/>}
        <h2>{artwork.title}</h2>
        <h3>{artwork.artist}</h3>
        <h4>{artwork.medium}</h4>
        {variant === 'exhibition' ? null : (
            <Button radius='pill' icon={faHeart} onClick={onClick}/>
        )}
    </Container>
);
};

export default ArtworkCard