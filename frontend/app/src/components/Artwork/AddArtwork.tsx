import { useEffect, useState } from "react"
import { addArtwork, getExhibitions } from "../../services/firebase"
import styled from 'styled-components'
import Button from "../Common/Button"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../../contexts/Auth"
import { Navigate } from "react-router-dom"
import { Exhibition } from "../../types"

const Wrapper = styled.div`
display: flex;
flex-direction: column;
row-gap: 1rem;
`

const Container = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
border: solid whitesmoke;
`

const ExhibitionTag = styled.div`
background-color: #a881af;
color: white;
font-weight: 700;
display: inline-block;
margin: 0.4rem;
padding: 0.4rem;
cursor: pointer;
padding: 10px;
`

const Input = styled.input`
padding: 4px;
font-size: 16px;`

interface AddArtworkProps {
    selectedArtwork: any
    onClose: () => void
}

const AddArtwork: React.FC<AddArtworkProps> = ({ selectedArtwork, onClose }) => {
    const [exhibitions, setExhibitions] = useState<Exhibition[]>([])
    const [exhibitionName, setExhibitionName] = useState('')
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
    const [error, setError] = useState('')
    const { user } = useAuth()

    
    useEffect(() => {
        const fetchExhibitions = async () => {
            if (user) {
                try {
                    const data = await getExhibitions(user.uid)
                    setExhibitions(data || [])
                } catch (error: any) {
                    console.error("Error fetching exhibitions", error)
                }
            }
        }
        fetchExhibitions()
    },[user])

    if(!user) {
        return <Navigate to='sign-in'/>
    }

    const handleAdd = async (exhibitionName: string) => {
        if (!exhibitionName.trim()) {
            setError('Exhibition name cannot be empty.')
            return 
        }

        if (!user) {
            setError('You must be logged in to add artwork.')
            return
        }

        try {
            const iiif_url = selectedArtwork.images.iiif_url
            await addArtwork(user.uid, exhibitionName, selectedArtwork.id, selectedArtwork.api, iiif_url)
            onClose()
            alert(`${selectedArtwork.title} was added to ${exhibitionName}`)
            resetForm()
        } catch (error: any){
            setError(error.message)
            console.error('Error: ', error)
        }
    }

    const resetForm = () => {
        setExhibitionName('')
        setIsCreatingNew(false)
        setError('')
    };

return (
<Wrapper>
    <strong>Which Exhibition do you want to add this to?</strong>
    <Container>
        {exhibitions.map((exhibition) => {
            return <ExhibitionTag key={exhibition.id} onClick={() => {
                handleAdd(exhibition.exhibition_name)
            }}>{exhibition.exhibition_name}</ExhibitionTag>
        })}
    </Container>
    <Container>
        {!isCreatingNew ? (
        <Button onClick={() => setIsCreatingNew(true)} body={'Add new Exhibition'}/>
        ) : (
            <>
                <Input type="text" value={exhibitionName} onChange={(e) => setExhibitionName(e.target.value)} required></Input>
                <Button onClick={() => handleAdd(exhibitionName)} icon={faPlus} radius='pill'/>
            </>
        )}
    </Container>
    {error && <p style={{ color: 'red' }}>{error}</p>}
</Wrapper>
)
}

export default AddArtwork