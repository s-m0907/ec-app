import { useParams } from "react-router-dom";
import ExhibitionWorks from "./ExhibitionWorks";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Exhibition } from "../../types";
import { getExhibitions } from "../../services/db";
import { useAuth } from "../../contexts/Auth";

const Title = styled.h2`
  margin: 20px 0 -10px 30px;
  font-weight: bold;
`;

const ExhibitionPage: React.FC = () => {
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const { exhibitionName } = useParams<{ exhibitionName: string }>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchExhibition = async () => {
      if (!user?.uid || !exhibitionName) return;

      try {
        const data = await getExhibitions(user.uid);
        const matchedExhibition = data.find(
          (exhibition: Exhibition) => exhibition.id === exhibitionName,
        );

        if (matchedExhibition) {
          setExhibition(matchedExhibition);
        } else {
          console.warn("Exhibition not found with the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching exhibition data:", error);
      }
    };

    fetchExhibition();
  }, [user?.uid, exhibitionName]);

  if (!exhibition) return null;

  return (
    <>
      <Title>{exhibition.exhibition_name}</Title>
      <ExhibitionWorks exhibitionArtworks={exhibition.exhibition_artworks} />
    </>
  );
};

export default ExhibitionPage;
