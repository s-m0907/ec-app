import styled from "styled-components";

const InfoSection = styled.section`
  background: #f9f9f9;
  padding: 40px 20px;
  text-align: center;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const InfoCard = styled.div`
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 300px;
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
`;

const Info: React.FC = () => {
  return (
    <InfoSection>
      <InfoGrid>
        <InfoCard>
          <InfoCardTitle>Discover Art</InfoCardTitle>
          <InfoCardDescription>
            Browse 1000s of artworks and search for your favourites.
          </InfoCardDescription>
        </InfoCard>
        <InfoCard>
          <InfoCardTitle>Create Exhibitions</InfoCardTitle>
          <InfoCardDescription>
            Build your own virtual exhibitions and learn more about each
            artwork.
          </InfoCardDescription>
        </InfoCard>
      </InfoGrid>
    </InfoSection>
  );
};

export default Info;
