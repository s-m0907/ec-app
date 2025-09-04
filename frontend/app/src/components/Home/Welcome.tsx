import styled from "styled-components";
import { Link } from "react-router-dom";

const WelcomeSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #807877;
  text-align: center;
  color: white;
  padding: 20px;
  min-height: 40vh;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 0 15px;
    min-height: 50vh;
  }

  @media (max-width: 480px) {
    padding: 15px;
    min-height: 60vh;
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

const WelcomeButton = styled(Link)`
  background-color: #fff;
  border: solid #655adb;
  color: black;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1.25rem;
  margin: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #655adb;
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

const InfoGrid = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
    margin: 1.5rem 0;
  }
`;

const InfoCard = styled.div`
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  max-width: 100%;
  text-align: center;
`;

const InfoCardTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const InfoCardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.4;
`;

const Welcome: React.FC = () => {
  return (
    <WelcomeSection>
      <WelcomeTitle>Art Sleuth</WelcomeTitle>
      <InfoGrid>
        <InfoCard>
          <InfoCardTitle>Discover Art</InfoCardTitle>
          <InfoCardDescription>
            Browse artwork from museum collections and search for artists,
            themes, materials and more.
          </InfoCardDescription>
        </InfoCard>
        <InfoCard>
          <InfoCardTitle>Create Exhibitions</InfoCardTitle>
          <InfoCardDescription>
            Add favorites to your own virtual exhibitions and learn more about
            each work.
          </InfoCardDescription>
        </InfoCard>
      </InfoGrid>
      <WelcomeButton to="/browse-artworks">Get Started</WelcomeButton>
    </WelcomeSection>
  );
};

export default Welcome;
