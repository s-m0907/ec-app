import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 20px 30px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 600px) {
    max-width: 500px;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }

  @media (max-width: 400px) {
    padding: 8px;
  }
`;

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  content: React.ReactNode | ((close: () => void) => React.ReactNode);
}

const Modal: React.FC<ModalProps> = ({ isOpen, close, content }) => {
  if (!isOpen) return null;

  const renderedContent =
    typeof content === "function" ? content(close) : content;

  return (
    <ModalOverlay>
      <ModalContent>
        {renderedContent}
        <ModalClose onClick={close}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </ModalClose>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
