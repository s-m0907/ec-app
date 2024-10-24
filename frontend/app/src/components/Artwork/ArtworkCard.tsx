import styled from "styled-components";
import Button from "../Common/Button";
import Placeholder from "../Common/Placeholder";
import { Artwork } from "../../types";
import { useState } from "react";
import { faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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

const Img = styled.img`
  max-width: 100%;

  &:hover {
    cursor: pointer;
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
          onClick={() => {
            if (
              variant === "exhibition" &&
              openCarouselModal &&
              index !== undefined
            ) {
              openCarouselModal(index);
            }
          }}
        />
      ) : (
        <Placeholder />
      )}
        <ActionsBar>
          {variant === "exhibition" ? (
            <Button icon={faPenToSquare} onClick={onClick} />
          ) : (
            <Button icon={faHeart} color={"#dd7973"} onClick={onClick} />
          )}
        </ActionsBar>
      </ImageWrapper>
      <h2>{artwork.title}</h2>
      <h3>{artwork.artist}</h3>
      <h4>{artwork.medium}</h4>
    </Container>
  );
};

export default ArtworkCard;
