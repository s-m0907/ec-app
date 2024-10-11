interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {

return <>
<label>Search: </label>
<input type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)}/>
</>
}

export default SearchBar