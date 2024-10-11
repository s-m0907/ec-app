import React, { useState } from 'react'
import { signIn, signUp } from '../../auth'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: solid #333 1px;
border-radius: 20px;
padding: 20px;
width: 30%;
margin: 10px;`

const FormGroup = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 20px;
`

const Label = styled.label`
margin-bottom: 8px;
font-size: 14px;
color: #333;
`

const Input = styled.input`
padding: 12px;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 16px;
transition: border-color 0.3s ease;

:focus {
  border-color: #007bff;
  outline: none;
}`

const Submit = styled.button`
padding: 12px 20px;
  background-color: #333;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  `

const Error = styled.p`
color: red;
`

const SignUpToggle = styled.p`
cursor: pointer;
color: blue;
`

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        if(isSignUp) {
        const user = await signUp(email, password, username)
        console.log('User signed up: ', user)
        }
        const user = await signIn(email, password)
        console.log('User signed in:', user)
        navigate('/browse-artworks')
        
    } catch(err: any) {
        setError(err.message)
        console.error('Sign-in failed:', err) 
    }
  }

  return(
    <Wrapper>
        <Container>
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <FormGroup>
                <Label>Username: </Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  />
              </FormGroup>
            )}
            <FormGroup>
              <Label>Email: </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup>
              <Label>Password: </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </FormGroup>
          {error && <Error>{error}</Error>}
            <Submit type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Submit>
          </form>
        </Container>
        <Container>
        <SignUpToggle onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Have an account? Sign In' : `Don't have an account? Sign up`}</SignUpToggle>
        </Container>
        </Wrapper>
      )
    };
    
    export default SignIn;
    