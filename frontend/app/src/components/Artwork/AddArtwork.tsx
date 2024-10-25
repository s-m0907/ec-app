import { useEffect, useState } from "react";
import { addArtwork, getExhibitions } from "../../services/db";
import styled from "styled-components";
import Button from "../Common/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/Auth";
import { Navigate } from "react-router-dom";
import { Exhibition } from "../../types";
import { gql, useApolloClient } from "@apollo/client";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: solid whitesmoke;
`;

const ExhibitionTag = styled.div`
  background-color: #a881af;
  color: white;
  font-weight: 700;
  display: inline-block;
  margin: 0.4rem;
  padding: 0.4rem;
  cursor: pointer;
  padding: 10px;
`;

const Input = styled.input`
  padding: 4px;
  font-size: 16px;
`;

const GET_ARTWORK = gql`
  query Artwork($artworkId: String, $api: String) {
    artwork(id: $artworkId, api: $api) {
      id
      title
      artist
      medium
      date
      images {
        alt_text
        iiif_url
        copyright
      }
      description
      place_of_origin
      dimensions
      is_on_view
      gallery
      location
      categories
      api
    }
  }
`;

interface AddArtworkProps {
  selectedArtwork: any;
  onClose: () => void;
  setToastMessage: any;
}

const AddArtwork: React.FC<AddArtworkProps> = ({
  selectedArtwork,
  onClose,
  setToastMessage,
}) => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [exhibitionName, setExhibitionName] = useState<string>("");
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const client = useApolloClient();

  useEffect(() => {
    const fetchExhibitions = async () => {
      if (user) {
        try {
          const data = await getExhibitions(user.uid);
          setExhibitions(data || []);
        } catch (error: any) {
          console.error("Error fetching exhibitions", error);
        }
      }
    };
    fetchExhibitions();
  }, [user]);

  if (!user) {
    return <Navigate to="sign-in" />;
  }

  const handleAdd = async (exhibitionName: string) => {
    if (!exhibitionName.trim()) {
      setError("Exhibition name cannot be empty.");
      return;
    }

    if (!user) {
      setError("You must be logged in to add artwork.");
      return;
    }

    try {
      const { data } = await client.query({
        query: GET_ARTWORK,
        variables: {
          artworkId: selectedArtwork.id,
          api: selectedArtwork.api,
        },
      });
      const artworkToSave = JSON.parse(JSON.stringify(data.artwork));

      if (artworkToSave.api === "v&a") {
        artworkToSave.gallery = selectedArtwork.gallery;
        artworkToSave.location = selectedArtwork.location;
      }
      await addArtwork(user.uid, exhibitionName, artworkToSave);
      onClose();
      setToastMessage(`Artwork added to exhibition ${exhibitionName}`);
      resetForm();
    } catch (error: any) {
      setError(error.message);
      console.error("Error: ", error);
    }
  };

  const resetForm = () => {
    setExhibitionName("");
    setIsCreatingNew(false);
    setError("");
  };

  return (
    <Wrapper>
      <strong>Which Exhibition do you want to add this to?</strong>
      <Container>
        {exhibitions.map((exhibition) => {
          return (
            <ExhibitionTag
              key={exhibition.id}
              onClick={() => {
                handleAdd(exhibition.exhibition_name);
              }}
            >
              {exhibition.exhibition_name}
            </ExhibitionTag>
          );
        })}
      </Container>
      <Container>
        {!isCreatingNew ? (
          <Button
            label={"Create a new exhibition"}
            onClick={() => setIsCreatingNew(true)}
            body={"Add new exhibition"}
          />
        ) : (
          <>
            <Input
              type="text"
              value={exhibitionName}
              onChange={(e) => setExhibitionName(e.target.value)}
              required
            ></Input>
            <Button
              label={"Add artwork to new exhibition"}
              onClick={() => handleAdd(exhibitionName)}
              icon={faPlus}
              radius="pill"
            />
          </>
        )}
      </Container>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Wrapper>
  );
};

export default AddArtwork;
