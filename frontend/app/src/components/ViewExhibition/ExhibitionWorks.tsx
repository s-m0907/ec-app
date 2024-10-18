import styled from "styled-components";
import useModal from "../../hooks/useModal";
import Modal from "../Common/Modal";
import ArtworkCard from "../Artwork/ArtworkCard";
import { ArtworkDetail, ArtworkId } from "../../types";
import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import EditArtwork from "./EditArtwork";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
`;

interface ExhibitionWorksProps {
  artwork_ids: ArtworkId[];
}

const GET_ARTWORK = gql`
  query Artwork($artworkId: String, $api: String) {
    artwork(id: $artworkId, api: $api) {
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
      description
      place_of_origin
      dimensions
      is_on_view
      location
      categories
      api
    }
  }
`;

const ExhibitionWorks: React.FC<ExhibitionWorksProps> = ({ artwork_ids }) => {
  const [artworks, setArtworks] = useState<ArtworkDetail[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { open, isOpen, close } = useModal();
  const client = useApolloClient();

  useEffect(() => {
    setIsLoading(true);
    const fetchArtworks = async () => {
      if (artwork_ids.length === 0) {
        setArtworks([]);
        return;
      }

      const artworkPromises = artwork_ids.map(async (artwork_id) => {
        try {
          const { data } = await client.query({
            query: GET_ARTWORK,
            variables: {
              artworkId: artwork_id.artwork_id,
              api: artwork_id.api,
            },
          });
          return data.artwork;
        } catch (error) {
          console.error("Error fetching details: ", error);
          return null;
        }
      });

      const fetchedArtworks = await Promise.all(artworkPromises);

      setArtworks(fetchedArtworks.filter((artwork) => artwork !== null));
      setIsLoading(false);
    };

    fetchArtworks();
  }, [artwork_ids, client]);

  const handleOpenModal = (artwork: any) => {
    setSelectedArtwork(artwork);
    open();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Grid>
        {artworks.map((artwork: any) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => handleOpenModal(artwork)}
            variant={"exhibition"}
          />
        ))}
      </Grid>
      <Modal
        isOpen={isOpen}
        close={close}
        content={
          <EditArtwork selectedArtwork={selectedArtwork} onClose={close} />
        }
      />
    </>
  );
};

export default ExhibitionWorks;
