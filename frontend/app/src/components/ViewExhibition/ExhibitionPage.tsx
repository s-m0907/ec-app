import { useLocation } from "react-router-dom";
import ExhibitionWorks from "./ExhibitionWorks";
import styled from "styled-components";

const Title = styled.h2`
  margin: 20px 0 -10px 30px;
  font-weight: bold;
`;

const ExhibitionPage: React.FC = () => {
  const location = useLocation();

  const { exhibition } = location.state || {};

  return (
    <>
      <Title>{exhibition.exhibition_name}</Title>
      <ExhibitionWorks exhibitionArtworks={exhibition.exhibition_artworks} />
    </>
  );
};

export default ExhibitionPage;
