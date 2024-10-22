import styled from "styled-components";
import ArtworkCard from "./ArtworkCard";
import Modal from "../Common/Modal";
import { useState } from "react";
import AddArtwork from "./AddArtwork";
import useModal from "../../hooks/useModal";
import { Artwork } from "../../types";
import Loading from "../Common/Loading";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toast from "../Common/Toast";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px;
  padding: 1rem;
  font-size: 20px;
  text-align: center;
  color: #4681f4;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
`;

interface ArtworkListProps {
  artworks: Artwork[];
  loading: boolean;
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks, loading }) => {
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const { open, isOpen, close } = useModal();
  const [toastMessage, setToastMessage] = useState<string>("");

  const handleOpenModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    open();
  };

  const handleToastClose = () => {
    setToastMessage("");
  };

  return loading ? (
    <Wrapper>
      <Loading />
    </Wrapper>
  ) : artworks.length === 0 ? (
    <Wrapper>
      <FontAwesomeIcon icon={faFaceSadCry} size="xl" />
      <p> We couldn’t find any matches. Try a different search term.</p>
    </Wrapper>
  ) : (
    <>
      <Grid>
        {artworks.map((artwork: Artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => handleOpenModal(artwork)}
            variant={"browse"}
          />
        ))}
      </Grid>
      <Modal
        isOpen={isOpen}
        close={close}
        content={
          <AddArtwork
            selectedArtwork={selectedArtwork}
            onClose={close}
            setToastMessage={setToastMessage}
          />
        }
      />
      {toastMessage && (
        <Toast
          color={"#28a745"}
          message={toastMessage}
          onClose={handleToastClose}
        />
      )}
    </>
  );
};

export default ArtworkList;
