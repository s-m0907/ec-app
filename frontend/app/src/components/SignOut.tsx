import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const auth = getAuth()
    await signOut(auth)
    navigate('/sign-in')
  };

  return <button onClick={handleLogout}>Logout</button>
};

export default LogoutButton