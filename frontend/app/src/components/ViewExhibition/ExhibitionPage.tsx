import { useLocation } from 'react-router-dom';
import ExhibitionWorks from './ExhibitionWorks';

const ExhibitionPage: React.FC = () => {
    const location = useLocation()

    const { exhibition } = location.state || {};

    return <>
    <h2>{exhibition.exhibition_name}</h2>
    <ExhibitionWorks artwork_ids={exhibition.artwork_ids}/>
    </>
}

export default ExhibitionPage