import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Artwork, Exhibition } from "../../types";
import useModal from "../../hooks/useModal";
import styled from "styled-components";
import CardImage from "./CardImage";
import Button from "../Common/Button";
import Modal from "../Common/Modal";
import EditExhibition from "./EditExhibition";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Toast from "../Common/Toast";

const Container = styled.div`
  flex: 1 1 calc(25% - 16px);
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: solid black 2px;
  overflow: hidden;

  @media (max-width: 1200px) {
    flex: 1 1 calc(33.33% - 16px);
  }

  @media (max-width: 800px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 100%;
  height: 500px;
`;

const Title = styled.h4`
  font-weight: bold;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
  padding: 0 20px;
  margin: 20px -16px -16px;
`;

const ActionsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  padding: 0.5rem;
  margin-bottom: 0.6rem;
  z-index: 1;
`;

interface ExhibitionCardProps {
  exhibition: Exhibition;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ exhibition }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedExhibition, setSelectedExhibition] =
    useState<Exhibition>(exhibition);
  const [toastMessage, setToastMessage] = useState<string>("");
  const { open, isOpen, close } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (exhibition) {
      setArtworks(exhibition.exhibition_artworks);
    }
  }, [exhibition]);

  const exhibitionUrl = `${location.pathname}/${exhibition.exhibition_name}`;

  const handleOpenModal = (exhibition: Exhibition) => {
    setSelectedExhibition(exhibition);
    open();
  };

  const handleToastClose = () => {
    setToastMessage("");
  };

  return (
    <>
      <Container>
        <Link to={exhibitionUrl} state={{ exhibition: exhibition }}>
          <ImageGrid>
            {artworks.slice(0, 3).map((artwork, index) => {
              return (
                <>
                  <CardImage
                    key={artwork.id}
                    artworkImage={artwork.images.iiif_url}
                    index={index}
                  />
                </>
              );
            })}
          </ImageGrid>
        </Link>
        <ActionsBar>
          <Button
            icon={faPenToSquare}
            onClick={() => handleOpenModal(exhibition)}
          />
        </ActionsBar>
        <Footer>
          <Title>{exhibition.exhibition_name}</Title>
          <p>{artworks.length} artworks</p>
        </Footer>
      </Container>
      <Modal
        isOpen={isOpen}
        close={close}
        content={
          <EditExhibition
            selectedExhibition={selectedExhibition}
            onClose={close}
            setToastMessage={setToastMessage}
          />
        }
      />
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

export default ExhibitionCard;
