import ExhibitionsList from "./ExhibitionsList";
import styled from "styled-components";

const Container = styled.div`
  padding: 1.5rem;
`;

const ExhibitionsPage: React.FC = () => {
  return (
    <Container>
      <h2>My Exhibitions</h2>
      <ExhibitionsList />
    </Container>
  );
};

export default ExhibitionsPage;
