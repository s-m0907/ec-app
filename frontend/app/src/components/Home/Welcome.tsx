import styled from "styled-components";
import { Link } from "react-router-dom";

const WelcomeSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ffbd03, #ff4b2b);
  text-align: center;
  color: white;
  padding: 0 20px;
  height: 40vh;

  @media (max-width: 768px) {
    padding: 0 15px;
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 60vh;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  font-family: "Arial", sans-serif;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const WelcomeButton = styled(Link)`
  background-color: #fff;
  border: solid #5adbb5;
  color: black;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1.25rem;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5adbb5;
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

const Welcome: React.FC = () => {
  return (
    <WelcomeSection>
      <WelcomeTitle>Welcome to Exhibition Curator</WelcomeTitle>
      <WelcomeSubtitle>Explore Artworks and Create Exhibitions</WelcomeSubtitle>
      <WelcomeButton to="/sign-in">Get Started</WelcomeButton>
    </WelcomeSection>
  );
};

export default Welcome;
