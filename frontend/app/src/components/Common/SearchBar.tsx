import styled from "styled-components";

const SearchWrapper = styled.div`
  background-color: #262b2f;
  padding: 2rem;
  margin: 0;
  color: whitesmoke;
`;

const Input = styled.input`
  margin-top: 0.4rem;
  padding: 0.7rem;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 18px;
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
      <h2>Search artworks </h2>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
