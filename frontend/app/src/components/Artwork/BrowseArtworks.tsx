import { useEffect, useState } from "react";
import ArtworkList from "./ArtworkList";
import SearchBar from "../Common/SearchBar";
import { useQuery, gql } from "@apollo/client";
import { Artwork } from "../../types";
import Button from "../Common/Button";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BrowseArtworks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const GET_ARTWORKS = gql`
    query Artworks($searchTerm: String!, $page: Int!) {
      artworks(searchTerm: $searchTerm, page: $page) {
        id
        title
        artist
        medium
        date
        images {
          lqip
          alt_text
          thumbnail
          iiif_url
        }
        api
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ARTWORKS, {
    variables: { searchTerm: debouncedSearchTerm, page: currentPage },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const artworks: Artwork[] = data?.artworks ?? [];

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {error && <>Error: {error.message}</>}
      {loading ? (
        <div>Loading...</div>
      ) : artworks.length === 0 ? (
        <div>No Artworks Found</div>
      ) : (
        <ArtworkList artworks={artworks} />
      )}
      <ButtonWrapper>
        <Button
          onClick={() => {
            setCurrentPage((currentPage) => currentPage - 1);
          }}
          disabled={currentPage === 1}
          icon={faArrowLeft}
        />
        <Button
          onClick={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}
          icon={faArrowRight}
        />
      </ButtonWrapper>
    </>
  );
};

export default BrowseArtworks;
