import { ArtworkId, Exhibition } from "../../firebase"
import styled from "styled-components"
import CardImage from "./CardImage"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Container = styled.div`
flex: 1 1 calc(25% - 16px);
padding: 16px;
display: flex;
flex-direction: column;
justify-content: flex-start;
border: solid black 2px;

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

const ImageGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
gap: 10px;
width: 100%;
height: 500px;
`

const Title = styled.h3`
font-weight: 500;
`

const Footer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: whitesmoke;
padding: 0 20px;
margin: 20px -16px -16px;`

interface ExhibitionCardProps {
    exhibition: Exhibition
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({exhibition}) => {
    const [artworkIds, setArtworkIds] = useState<ArtworkId[]>([])
    const location = useLocation()

    useEffect(() => {
        if (exhibition) {
            setArtworkIds(exhibition.artwork_ids)
    }}, [])

    const exhibitionUrl = `${location.pathname}/${exhibition.exhibition_name}`

    return <Container>
        <Link to={exhibitionUrl} state={{ exhibition: exhibition }}>
        <ImageGrid>
        {artworkIds.map((artwork_id, index) => {
            return <CardImage key={index} artwork_id={artwork_id} index={index}/>
        })}
        </ImageGrid>
        </Link>
        <Footer>
        <Title>{exhibition.exhibition_name}</Title>
        <p>{artworkIds.length} artworks</p>
        </Footer>
        </Container>
}

export default ExhibitionCard