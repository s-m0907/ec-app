import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledNav = styled.div`
  font-size: 18px;
  margin: 0;
  text-align: right;
`

interface NavProps {
  userId: string
}

const Nav: React.FC<NavProps> = ({userId}) => {

  return (
    <StyledNav>
      <Link
        to="browse-artworks"
        style={{
          padding: "10px",
          textDecoration: "none",
          color: "black",
        }}
      >
        Browse Artworks
      </Link>
      <Link to={`/${userId}/exhibitions`}
              style={{
                padding: "5px",
                textDecoration: "none",
                color: "black",
              }}
              >
                My Exhibitions</Link>
    </StyledNav>
  )
}

export default Nav;