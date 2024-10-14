import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ExhibitionWorks from './ExhibitionWorks';

const ExhibitionPage: React.FC = () => {
    const location = useLocation()
    const {exhibition} = location.state || {}
    const idString = exhibition.artwork_ids.join(',')
    const {data, error} = useFetch<any>(`https://api.artic.edu/api/v1/artworks?ids=${idString}`)
    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        if(data){
            setArtworks(data.data)
        }
    }, [data])

    return <>
    <h2>{exhibition.exhibition_name}</h2>
    <ExhibitionWorks artworks={artworks}/>
    </>
}

export default ExhibitionPage