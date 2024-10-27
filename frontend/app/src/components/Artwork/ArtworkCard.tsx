import styled from "styled-components";
import Button from "../Common/Button";
import Placeholder from "../Common/Placeholder";
import { Artwork } from "../../types";
import { useState } from "react";
import {
  faHeart,
  faInfoCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  flex: 1 1 calc(25% - 16px);
  padding: 16px;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  font-family: futura;

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

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
`;

const ActionsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  padding: 0.5rem;
  margin-bottom: 0.6rem;
  z-index: 1;
`;

const InfoLink = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.8;
  transition: opacity 0.3s;
  color: white;
  z-index: 2;
  cursor: pointer;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const Img = styled.img`
  max-width: 100%;
  }
`;

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
  variant: string;
  index?: number;
  openCarouselModal?: (index: number) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onClick,
  variant,
  index,
  openCarouselModal,
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(artwork.images.iiif_url);

  return (
    <Container>
      <ImageWrapper>
        {imgSrc ? (
          <Img
            src={imgSrc}
            alt={artwork.images.alt_text || artwork.title}
            onError={() => setImgSrc(null)}
          />
        ) : (
          <Placeholder />
        )}
        {variant === "exhibition" && (
          <InfoLink
            onClick={() => {
              if (
                variant === "exhibition" &&
                openCarouselModal &&
                index !== undefined
              ) {
                openCarouselModal(index);
              }
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} size="2x" />
          </InfoLink>
        )}
        <ActionsBar>
          {variant === "exhibition" ? (
            <Button
              label={"Edit artwork"}
              icon={faPenToSquare}
              onClick={onClick}
            />
          ) : (
            <Button
              label={"Add artwork"}
              icon={faHeart}
              color={"#dd7973"}
              onClick={onClick}
            />
          )}
        </ActionsBar>
      </ImageWrapper>
      <h2>{artwork.title || "Untitled"}</h2>
      <h3>{artwork.artist}</h3>
      <h4>{artwork.medium}</h4>
    </Container>
  );
};

export default ArtworkCard;
