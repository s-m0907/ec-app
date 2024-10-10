import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import Button from './Button'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

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
    artwork: any
    onClick: () => void
  }

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
const [imageUrl, setImageUrl] = useState<string | null>(null)
const {data, error} = useFetch<any>(`https://api.artic.edu/api/v1/artworks/${artwork.id}?fields=id,title,image_id,artist_title,[is_public_domain]=true`)

useEffect(() => {
    if (data && data.data && data.data.image_id) {
        const url = `${data.config.iiif_url}/${data.data.image_id}/full/843,/0/default.jpg`
        setImageUrl(url)
    }
}, [data])

if (error) {
    return <>Error: {error}</>
  }

return data ? <Container>
          {imageUrl ? <Img src={imageUrl} alt={artwork.title} /> : <></>}
          <h2>{artwork.title}</h2>
          <h3>{data.data.artist_title}</h3>
          <Button icon={faHeart} onClick={onClick}/>
        </Container>
: <></>

};

export default ArtworkCard