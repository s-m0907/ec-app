import { useParams } from "react-router-dom";
import { removeArtwork } from "../../services/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Artwork } from "../../types";

const Action = styled.p`
  cursor: pointer;
  color: #ed0800;
`;

interface EditArtworkProps {
  selectedArtwork: Artwork;
  onClose: () => void;
  setToastMessage: (message: string) => void;
}

const EditArtwork: React.FC<EditArtworkProps> = ({
  selectedArtwork,
  onClose,
  setToastMessage,
}) => {
  const { userId, exhibitionName } = useParams();

  const handleRemove = async (artwork_id: string) => {
    if (!userId || !exhibitionName) {
      console.error("Missing user id or exhibition name from URL parameters.");
      return;
    }
    const userConfirmed = confirm(
      `Are you sure you want to remove this from ${exhibitionName}?`,
    );
    if (userConfirmed) {
      try {
        await removeArtwork(userId, exhibitionName, artwork_id);
        onClose();
        setToastMessage(
          `${selectedArtwork.title} removed from ${exhibitionName}`,
        );
      } catch (error) {
        console.error("Could not remove artwork: ", error);
      }
    }
  };

  return (
    <Action
      onClick={() => {
        handleRemove(selectedArtwork.id);
      }}
    >
      <FontAwesomeIcon icon={faTrash} /> Remove artwork
    </Action>
  );
};

export default EditArtwork;
