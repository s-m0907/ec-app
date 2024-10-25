import styled from "styled-components";
import Nav from "./Nav";

const StyledHeader = styled.header`
  background-color: whitesmoke;
  margin: -10px -10px 10px -10px;
  padding: 1.5rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin: 0;

  @media (max-width: 786px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Title>Art Sleuth</Title>
      <Nav />
    </StyledHeader>
  );
};

export default Header;
