import styled from "styled-components";
import useModal from "../../hooks/useModal";
import Modal from "../Common/Modal";
import ArtworkCard from "../Artwork/ArtworkCard";
import { Artwork, ArtworkId } from "../../types";
import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import EditArtwork from "./EditArtwork";
import Carousel from "../Common/Carousel";
import Loading from "../Common/Loading";
import Toast from "../Common/Toast";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
`;

const CarouselModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
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
  }
`;

const ExhibitionWorks: React.FC<ExhibitionWorksProps> = ({ artwork_ids }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
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

  const handleOpenModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    open();
  };

  const openCarouselModal = (index: number): void => {
    setCurrentIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = (): void => {
    setIsCarouselOpen(false);
  };

  const handleToastClose = () => {
    setToastMessage("");
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Grid>
        {artworks.map((artwork: Artwork, index: number) => (
            <ArtworkCard
              index={index}
              openCarouselModal = {openCarouselModal}
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
          <EditArtwork
            selectedArtwork={selectedArtwork}
            onClose={close}
            setToastMessage={setToastMessage}
          />
        }
      />
      {isCarouselOpen && (
        <CarouselModal>
          <Carousel
            artworks={artworks}
            currentIndex={currentIndex}
            onClose={closeCarousel}
          />
        </CarouselModal>
      )}
      {toastMessage && (
        <Toast
          color={"#dc3545"}
          message={toastMessage}
          onClose={handleToastClose}
        />
      )}
    </>
  );
};

export default ExhibitionWorks;
