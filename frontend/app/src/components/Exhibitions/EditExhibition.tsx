import { useParams } from "react-router-dom";
import { deleteExhibition } from "../../services/firebase";
import { Exhibition } from "../../types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Action = styled.p`
  cursor: pointer;
  color: #ed0800;
`;

interface EditExhibitionProps {
  selectedExhibition: Exhibition;
  onClose: () => void;
  setToastMessage: any;
}

const EditExhibition: React.FC<EditExhibitionProps> = ({
  selectedExhibition,
  onClose,
  setToastMessage,
}) => {
  const { userId } = useParams();

  const handleRemove = async (exhibitionName: string) => {
    if (!userId) {
      console.error("Missing user id from URL parameters.");
      return;
    }
    const userConfirmed = confirm(
      "Are you sure you want to delete this exhibition?"
    );
    if (userConfirmed) {
      try {
        await deleteExhibition(userId, exhibitionName);
        onClose();
        setToastMessage(
          `'${selectedExhibition.exhibition_name}' exhibition deleted`
        );
      } catch (error) {
        console.error("Could not delete Exhibition: ", error);
      }
    }
  };

  return (
    <Action
      onClick={() => {
        handleRemove(selectedExhibition.exhibition_name);
      }}
    >
      <FontAwesomeIcon icon={faTrash} /> Delete Exhibition
    </Action>
  );
};

export default EditExhibition;
