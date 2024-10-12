import { useEffect, useState } from "react"
import { Exhibition, getExhibitions } from "../../firebase"
import { useAuth } from "../../contexts/Auth"
import ExhibitionCard from "./ExhibitionCard"

const ExhibitionsList: React.FC = () => {
    const [exhibitions, setExhibitions] = useState<Exhibition[]>([])
    const { user } = useAuth()

    useEffect(() => {
        const fetchExhibitions = async () => {
            if (user) {
                try {
                    const data = await getExhibitions(user.uid)
                    setExhibitions(data || [])
                    console.log(exhibitions)
                } catch (error: any) {
                    console.error("Error fetching exhibitions", error)
                }
            }
        }
        fetchExhibitions()
    },[])

    return <>
    {exhibitions.map((exhibition) => {
        return <ExhibitionCard exhibition = {exhibition}/>
    })}
    </>
}

export default ExhibitionsList