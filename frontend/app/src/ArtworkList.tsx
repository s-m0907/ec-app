import styled from 'styled-components'
import ArtworkCard from './ArtworkCard'
import useFetch from './hooks/useFetch'

const Grid = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 16px;
padding: 16px
`

const ArtworkList: React.FC = () => {
const { data, error } = useFetch<any>(`https://api.artic.edu/api/v1/artworks`)
    
    if (error) {
        return <div>Error: {error}</div>
      }
    
      if (!data) {
        return <div>Loading...</div>
      }
    
      const artworks = data.data


    return<Grid>
        {artworks.map((artwork: any) => {
            return <ArtworkCard key={artwork.id} artwork = {artwork}/>
        })}
    </Grid>
}

export default ArtworkList