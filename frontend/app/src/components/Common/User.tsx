import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Username = styled.p`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #000000;
  color: white;
  display: flex;
  justify-content: center;
  gap: 2px;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

interface UserProps {
  username: string;
}

const User: React.FC<UserProps> = ({ username }) => {
  return (
    <>
      <Username>
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        {username[0].toUpperCase()}
      </Username>
    </>
  );
};

export default User;
