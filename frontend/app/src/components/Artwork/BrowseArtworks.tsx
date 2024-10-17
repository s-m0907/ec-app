import { useEffect, useState } from "react"
import ArtworkList from "./ArtworkList"
import SearchBar from "../Common/SearchBar"
import { useQuery, gql } from '@apollo/client'

const BrowseArtworks: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
    
  const GET_ARTWORKS = gql`
  query Artworks($searchTerm: String!) {
    artworks(searchTerm: $searchTerm) {
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
      api
    }
  }
  `

  const { loading, error, data } = useQuery(GET_ARTWORKS, {
    variables: { searchTerm: debouncedSearchTerm },})

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 400)
    
        return () => {
            clearTimeout(handler)
        };
    }, [searchTerm])

      const handleSearchChange = (term: string) => {
        setSearchTerm(term)
    }

      return <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
      {error && <>Error: {error}</>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        (() => {
          const artworks = data.artworks

          if (artworks.length === 0) {
            return <div>No Artworks Found</div>
          }
          return <ArtworkList artworks={artworks}/>
        })()
      )}
      </>
}

export default BrowseArtworks