import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledButton = styled.button`
`

interface ButtonProps {
    body?: string
    onClick: () => void
    icon?: any
  }

const Button: React.FC<ButtonProps> = ({ icon, body, onClick }) => {

return <StyledButton onClick={onClick}>
    {icon && <FontAwesomeIcon icon={icon} />}{body}
</StyledButton>
}

export default Button