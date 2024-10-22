import React, { useState } from "react";
import styled from "styled-components";
import { Artwork } from "../../types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface CarouselProps {
  artworks: Artwork[];
  currentIndex: number;
  onClose: () => void;
}

const CarouselContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  max-height: 40%;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  transition: transform 0.5s ease-in-out;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const SlideImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  margin: 1rem;
`;

const Controls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  padding: 10px;
  font-size: 18px;
  pointer-events: all;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
`;

const ArtworkInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ArtworkDetails = styled.div`
  flex: 1;
`;

const ArtworkLocation = styled.div`
  text-align: right;
`;

const GalleryText = styled.p`
  fontsize: 14px;
  padding: 0;
  margin: 0;
  fontweight: lighter;
`;

const Dt = styled.dt`
  color: gray;
  margin: 0;
`;

const Dd = styled.dd`
  margin: 0 0 1rem 0;
`;

const Carousel: React.FC<CarouselProps> = ({
  artworks,
  currentIndex,
  onClose,
}) => {
  const [index, setIndex] = useState<number>(currentIndex);

  const goToNextSlide = (): void => {
    setIndex((prevIndex) =>
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPreviousSlide = (): void => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1,
    );
  };

  const currentArtwork = artworks[index];

  return (
    <CarouselContainer>
      <CloseButton onClick={onClose}>✕</CloseButton>
      <Controls>
        <ControlButton onClick={goToPreviousSlide}>❮</ControlButton>
        <ControlButton onClick={goToNextSlide}>❯</ControlButton>
      </Controls>
      <Slide>
        <SlideImage
          src={currentArtwork.images.iiif_url}
          alt={currentArtwork.title}
        />
        <Overlay>
          <ArtworkInfo>
            <ArtworkDetails>
              <h2>{currentArtwork.artist}</h2>
              <h3>{currentArtwork.title}</h3>
              <h4>{currentArtwork.date}</h4>
            </ArtworkDetails>
            <ArtworkLocation>
              {currentArtwork.is_on_view && (
                <>
                  <p
                    style={{
                      color: "#ffbd03",
                      margin: 0,
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    On view
                  </p>
                  <GalleryText>{currentArtwork.gallery}</GalleryText>
                  <GalleryText>{currentArtwork.location}</GalleryText>
                </>
              )}
              <Link
                to={`/artworks/${currentArtwork.id}`}
                state={{ artwork: currentArtwork }}
              >
                <FontAwesomeIcon icon={faInfoCircle} size="xl" />
              </Link>
            </ArtworkLocation>
          </ArtworkInfo>
          <dl>
            {currentArtwork.medium && (
              <>
                <Dt>Medium</Dt>
                <Dd>{currentArtwork.medium}</Dd>
              </>
            )}
            {currentArtwork.description && (
              <>
                <Dt>Description</Dt>
                <Dd>{currentArtwork.description}</Dd>
              </>
            )}
            {currentArtwork.images.copyright !==
              "https://creativecommons.org/publicdomain/zero/1.0/" && (
              <Dd>{currentArtwork.images.copyright}</Dd>
            )}
          </dl>
        </Overlay>
      </Slide>
    </CarouselContainer>
  );
};

export default Carousel;
