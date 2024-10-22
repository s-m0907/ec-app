import styled from "styled-components";

const SearchWrapper = styled.div`
  background-color: #262b2f;
  padding: 2rem;
  margin: 0;
  color: whitesmoke;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const Input = styled.input`
  margin-top: 0.4rem;
  padding: 0.7rem;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 0.5rem;
  }
`;

const Label = styled.label`
  font-size: 22px;
  font-weight: bold;
`;

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <SearchWrapper>
      <Label htmlFor="search">Search artworks </Label>
      <Input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
