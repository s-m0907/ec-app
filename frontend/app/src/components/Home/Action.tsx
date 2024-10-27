import { Link } from "react-router-dom";
import styled from "styled-components";

const ActionSection = styled.section`
  background-color: #f9f9f9;
  padding: 60px 20px;
  text-align: center;
  color: #5adbb5;
`;

const ActionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ActionButton = styled(Link)`
  background-color: #5adbb5;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1.25rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 18px;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 6px 16px;
  }
`;

const Action: React.FC = () => {
  return (
    <ActionSection>
      <ActionTitle>Don&apos;t have an account?</ActionTitle>
      <ActionButton to="/sign-in" state={{ signingUp: true }}>
        Sign up!
      </ActionButton>
    </ActionSection>
  );
};

export default Action;
