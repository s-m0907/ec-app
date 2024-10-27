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

const GET_ARTWORKS = gql`
  query Artworks($searchTerm: String!, $page: Int!) {
    artworks(searchTerm: $searchTerm, page: $page) {
      artworks {
        id
        title
        artist
        medium
        date
        images {
          alt_text
          iiif_url
          copyright
        }
        description
        place_of_origin
        dimensions
        is_on_view
        gallery
        location
        categories
        api
      }
      aicTotalCount
      vaTotalCount
    }
  }
`;

const BrowseArtworks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 20;

  const { loading, error, data } = useQuery(GET_ARTWORKS, {
    variables: { searchTerm: debouncedSearchTerm, page: currentPage },
  });

  const artworks: Artwork[] = data?.artworks?.artworks ?? [];
  const aicTotalCount: number = data?.artworks?.aicTotalCount ?? 0;
  const vaTotalCount: number = data?.artworks?.vaTotalCount ?? 0;

  const aicTotalPages = Math.ceil(aicTotalCount / limit);
  const vaTotalPages = Math.ceil(vaTotalCount / limit);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.max(aicTotalPages, vaTotalPages)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <ArtworkList artworks={artworks} loading={loading} error={error} />
      <ButtonWrapper>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          icon={faArrowLeft}
          label={"Previous page"}
        />
        <Button
          label={"Next page"}
          onClick={handleNextPage}
          icon={faArrowRight}
        />
      </ButtonWrapper>
    </>
  );
};

export default BrowseArtworks;
