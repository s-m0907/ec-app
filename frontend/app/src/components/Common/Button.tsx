import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonHTMLAttributes } from "react";

const StyledButton = styled.button<ButtonProps>`
  padding: 0.8rem 1.2rem;
  margin: 0 0.4rem;
  background-color: ${(props) => (props.color ? props.color : "#262B2F")};
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  border-radius: ${(props) => (props.radius === "pill" ? "40px" : "4px")};

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0.6rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 0.5rem 0.8rem;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  body?: string;
  onClick: () => void;
  label: string;
  icon?: IconProp;
  radius?: "pill";
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  body,
  onClick,
  radius,
  color,
}) => {
  return (
    <StyledButton
      label={label}
      aria-label={label}
      onClick={onClick}
      radius={radius}
      color={color}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {body}
    </StyledButton>
  );
};

export default Button;
