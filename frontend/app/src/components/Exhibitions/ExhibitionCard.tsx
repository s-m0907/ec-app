import { Exhibition } from "../../firebase"

interface ExhibitionCardProps {
    exhibition: Exhibition
}


const ExhibitionCard: React.FC<ExhibitionCardProps> = ({exhibition}) => {

    return <>{exhibition.exhibition_name}</>

}

export default ExhibitionCard