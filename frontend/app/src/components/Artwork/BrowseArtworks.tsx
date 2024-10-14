import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import ArtworkList from "./ArtworkList"
import SearchBar from "../Common/SearchBar"

const BrowseArtworks: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
    const { data, error } = useFetch<any>(`https://api.artic.edu/api/v1/artworks/search?q=${debouncedSearchTerm}`)
    
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
        console.log(term)
    }

      return <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
      {error && <>Error: {error}</>}
      {!data ? (
        <div>Loading...</div>
      ) : (
        (() => {
          const artworks = data.data

          if (artworks.length === 0) {
            return <div>No Artworks Found</div>
          }
          return <ArtworkList artworks={artworks}/>
        })()
      )}
      </>
}

export default BrowseArtworks