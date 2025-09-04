import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { useEffect, useState } from "react";
import { getUser } from "../../services/db";
import User from "../Common/User";

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
  background-color: #655adb;
  color: white;
  padding: 0.4rem;
  border-radius: 2px;
  cursor: pointer;
`;

const Nav: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const data = await getUser(user.uid);
          if (data) {
            setUsername(data.username);
          }
        } catch (error) {
          console.error("Could not fetch user data");
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/sign-in", { state: { signingUp: false } });
  };

  if (user) {
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
          to={`/${username}/exhibitions`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          My Exhibitions
        </Link>
        <SignOut onClick={handleSignOut}>Sign Out</SignOut>
        {username ? <User username={username} /> : <></>}
      </StyledNav>
    );
  } else {
    return <SignOut onClick={handleSignIn}>Sign In</SignOut>;
  }
};

export default Nav;
