import { useAuth } from "../../contexts/Auth";
import { useEffect, useState } from "react";
import { Exhibition } from "../../types";
import { getExhibitions } from "../../services/firebase";
import styled from "styled-components";
import ExhibitionCard from "./ExhibitionCard";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
`;
const Info = styled.h3`
  margin: 10px 20px 0;
  text-align: right;
`;

const ExhibitionsList: React.FC = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExhibitions = async () => {
      if (user) {
        try {
          const data = await getExhibitions(user.uid);
          setExhibitions(data || []);
        } catch (error: any) {
          console.error("Error fetching exhibitions", error);
        }
      }
    };
    fetchExhibitions();
  }, [user]);

  return (
    <>
      <Info>{exhibitions.length} Exhibitions</Info>
      <Grid>
        {exhibitions.map((exhibition) => {
          return <ExhibitionCard key={exhibition.id} exhibition={exhibition} />;
        })}
      </Grid>
    </>
  );
};

export default ExhibitionsList;
