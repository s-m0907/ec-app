import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: left;
  flex-direction: column;
  max-width: 75%;
`;

const InfoText = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: left;
`;

const Img = styled.img`
  max-width: 100%;
  margin: 2rem 0;
`;

const Tag = styled.h5`
  color: #ffbd03;
  font-size: 22px;
  margin: 0;
  text-align: right;
`;

const Location = styled.h6`
  font-size: 14px;
  padding: 0;
  margin: 0;
  font-weight: 200;
  text-align: right;
`;

const Dt = styled.dt`
  color: #707070;
  margin: 0 0 0.1rem 0;
`;

const Dd = styled.dd`
  margin: 0 0 1rem 0;
`;

const ExternalLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  position: relative;
  transition: color 0.3s;
  text-align: right;

  &::after {
    content: " ↗";
    font-size: 0.8em;
    color: #6c757d;
    position: absolute;
    right: -20px;
    top: 0;
    transition: color 0.3s;
  }

  &:hover {
    color: #0056b3;
  }

  &:hover::after {
    color: #0056b3;
  }
`;

const ArtworkPage: React.FC = () => {
  const location = useLocation();

  const { artwork } = location.state || {};

  return (
    <Wrapper>
      <Container>
        <h2>
          {artwork.artist}{" "}
          {artwork.place_of_origin && `(${artwork.place_of_origin})`}
        </h2>
        <Img src={artwork.images.iiif_url} />
        <h3>{artwork.title}</h3>
        <h4>{artwork.date}</h4>
      </Container>
      <InfoText>
        {artwork.is_on_view && (
          <>
            <Tag>On view</Tag>
            <Location>{artwork.gallery}</Location>
            <Location>{artwork.location}</Location>
          </>
        )}
        {artwork.api === "aic" && (
          <ExternalLink to={`https://www.artic.edu/artworks/${artwork.id}`}>
            Find out more about this artwork on the Art Institute of Chicago
            site
          </ExternalLink>
        )}
        {artwork.api === "v&a" && (
          <ExternalLink to={`https://collections.vam.ac.uk/item/${artwork.id}`}>
            Find out more about this artwork on the V&A site
          </ExternalLink>
        )}
        <dl>
          {artwork.medium && (
            <>
              <Dt>Medium</Dt>
              <Dd>{artwork.medium}</Dd>
            </>
          )}
          {artwork.dimensions && (
            <>
              <Dt>Dimension</Dt>
              <Dd>{artwork.dimensions}</Dd>
            </>
          )}
          {artwork.description && (
            <>
              <Dt>Description</Dt>
              <Dd>{artwork.description}</Dd>
            </>
          )}
          {artwork.categories && (
            <>
              <Dt>Categories</Dt>
              {artwork.categories.map((category: string, index: number) => (
                <Dd key={index}>{category}</Dd>
              ))}
            </>
          )}
          <Dd>
            {artwork.images.copyright ===
            "https://creativecommons.org/publicdomain/zero/1.0/"
              ? null
              : artwork.images.copyright}
          </Dd>
        </dl>
      </InfoText>
    </Wrapper>
  );
};

export default ArtworkPage;
