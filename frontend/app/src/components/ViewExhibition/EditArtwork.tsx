import { useParams } from "react-router-dom";
import { removeArtwork } from "../../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Action = styled.p`
  cursor: pointer;
  color: #ed0800;
`;

interface EditArtworkProps {
  selectedArtwork: any;
  onClose: () => void;
}

const EditArtwork: React.FC<EditArtworkProps> = ({
  selectedArtwork,
  onClose,
}) => {
  const { userId, exhibitionName } = useParams();

  const handleRemove = async (artwork_id: string) => {
    if (!userId || !exhibitionName) {
      console.error("Missing user id or exhibition name from URL parameters.");
      return;
    }
    try {
      await removeArtwork(userId, exhibitionName, artwork_id);
      onClose();
      alert(`${selectedArtwork.title} was removed from ${exhibitionName}`);
    } catch (error) {
      console.error("Could not remove artwork: ", error);
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
