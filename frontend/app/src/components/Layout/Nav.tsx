import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.div`
  font-size: 18px;
  margin: 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    cursor: pointer;
  }
`;

const SignOut = styled.p`
  background-color: #a881af;
  color: white;
  padding: 0.3rem;
  border-radius: 2px;
`;

interface NavProps {
  userId: string;
}

const Nav: React.FC<NavProps> = ({ userId }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/sign-in");
  };

  return (
    <StyledNav>
      <Link
        to="browse-artworks"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        Browse Artworks
      </Link>
      <Link
        to={`/${userId}/exhibitions`}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        My Exhibitions
      </Link>
      <SignOut onClick={handleLogout}>Sign Out</SignOut>
    </StyledNav>
  );
};

export default Nav;
