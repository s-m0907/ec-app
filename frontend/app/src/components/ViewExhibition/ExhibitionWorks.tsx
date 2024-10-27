import styled from "styled-components";
import useModal from "../../hooks/useModal";
import Modal from "../Common/Modal";
import ArtworkCard from "../Artwork/ArtworkCard";
import { Artwork } from "../../types";
import { useEffect, useState } from "react";
import EditArtwork from "./EditArtwork";
import Carousel from "../Common/Carousel";
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
  exhibitionArtworks: Artwork[];
}

const ExhibitionWorks: React.FC<ExhibitionWorksProps> = ({
  exhibitionArtworks,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const { open, isOpen, close } = useModal();
  const [deletedArtwork, setDeletedArtwork] = useState<Artwork>(null);

  useEffect(() => {
    if (exhibitionArtworks.length === 0) {
      setArtworks([]);
      return;
    }
    if (deletedArtwork) {
      console.log(deletedArtwork, "to delete");
      setArtworks((prevArtworks) =>
        prevArtworks.filter((artwork) => artwork.id !== deletedArtwork.id),
      );
    } else {
      setArtworks(exhibitionArtworks);
    }
  }, [exhibitionArtworks, deletedArtwork]);

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

  return (
    <>
      <Grid>
        {artworks.map((artwork: Artwork, index: number) => (
          <ArtworkCard
            index={index}
            openCarouselModal={openCarouselModal}
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
            setDeletedArtwork={setDeletedArtwork}
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
