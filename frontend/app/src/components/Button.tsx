import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { ButtonHTMLAttributes } from 'react'

const StyledButton = styled.button<ButtonProps>`
  padding: 12px;
  margin: 0 0.4rem;
  background-color: #333;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  border-radius: ${props => 
    props.radius === 'pill' ? '40px' :
    '4px'}
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    body?: string
    onClick: () => void
    icon?: IconProp
    radius?: 'pill'
  }

const Button: React.FC<ButtonProps> = ({ icon, body, onClick, radius }) => {

return <StyledButton onClick={onClick} radius={radius}>
    {icon && <FontAwesomeIcon icon={icon} />}{body}
</StyledButton>
}

export default Button