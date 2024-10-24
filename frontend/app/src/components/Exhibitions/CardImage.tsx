import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Image1 = styled.div`
grid-row: 1 / 3;
grid-column: 1 / 2;
}
`;

const Image2 = styled.div`
grid-row: 1 / 2;
grid-column: 2 / 3;
}
`;

const Image3 = styled.div`
grid-row: 2 / 3;
grid-column: 2 / 2;
}
`;

interface CardImageProps {
  artworkImage: string;
  index: number;
}

const CardImage: React.FC<CardImageProps> = ({ artworkImage, index }) => {
  return (
    <>
      {index === 0 && (
        <Image1>
          <Img src={artworkImage} />
        </Image1>
      )}
      {index === 1 && (
        <Image2>
          <Img src={artworkImage} />
        </Image2>
      )}
      {index === 2 && (
        <Image3>
          <Img src={artworkImage} />
        </Image3>
      )}
    </>
  );
};

export default CardImage;
