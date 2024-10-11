import styled from 'styled-components'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/Auth"
import Nav from './Nav'
import Button from '../Common/Button'


const StyledHeader = styled.header`
background-color: whitesmoke;
margin: -10px -10px 10px -10px;
padding: 1rem;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const Title = styled.h1`
font-size: 20px;
font-weight: 500;`

const Header: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleLogout = async () => {
        const auth = getAuth()
        await signOut(auth)
        navigate('/sign-in')
      }

if(user){
    return <StyledHeader>
    <Title>Exhibition Curator</Title>
    <Nav/>
    <Button onClick={handleLogout} body={"Sign out"}/>
</StyledHeader>
} else{
    return <></>
}
}

export default Header