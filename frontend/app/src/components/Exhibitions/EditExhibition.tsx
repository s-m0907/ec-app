import { deleteExhibition } from "../../services/db";
import { Exhibition } from "../../types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { isErrorWithMessage } from "../../utils/errorMessage";
import { useAuth } from "../../contexts/Auth";

const Action = styled.p`
  cursor: pointer;
  color: #ed0800;
`;

interface EditExhibitionProps {
  selectedExhibition: Exhibition;
  onClose: () => void;
  setToastMessage: (message: string) => void;
  setIsDeleted: (isDeleted: boolean) => void;
}

const EditExhibition: React.FC<EditExhibitionProps> = ({
  selectedExhibition,
  onClose,
  setToastMessage,
  setIsDeleted,
}) => {
  const { user } = useAuth();

  const handleRemove = async (exhibitionName: string) => {
    if (!user) {
      console.error("Missing user id from URL parameters.");
      return;
    }
    const userConfirmed = confirm(
      "Are you sure you want to delete this exhibition?",
    );
    if (userConfirmed) {
      try {
        await deleteExhibition(user.uid, exhibitionName);
        setIsDeleted(true);
        onClose();
        setToastMessage(
          `'${selectedExhibition.exhibition_name}' exhibition deleted`,
        );
      } catch (error: unknown) {
        if (isErrorWithMessage(error)) {
          console.error("Could not delete Exhibition: ", error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
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
