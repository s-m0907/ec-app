import styled from 'styled-components'

const ImagePlaceholder = styled.div`
  height: 25vw;
  max-height: 400px;
  width: 100%;
  max-width: 600px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 30vw;
  }

  @media (max-width: 480px) {
    height: 40vw;
  }
`;

const PlaceholderText = styled.p`
  font-weight: bold;
  color: #4681f4;
  text-align: center;
  margin: 0;
`;

const Placeholder: React.FC = () => {
    return <ImagePlaceholder><PlaceholderText>No Image</PlaceholderText></ImagePlaceholder>
  };
  
  export default Placeholder;