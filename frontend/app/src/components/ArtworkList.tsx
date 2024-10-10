import styled from 'styled-components'
import ArtworkCard from './ArtworkCard'

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

    return<Grid>
        {artworks.map((artwork: any) => {
            return <ArtworkCard key={artwork.id} artwork = {artwork}/>
        })}
    </Grid>
}

export default ArtworkList