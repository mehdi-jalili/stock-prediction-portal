import { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom' 
import Button from './Button'
import { AuthContext } from '../AuthProvider'

export default function Header() {
  const {isLoggedin, setIsLoggedin} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedin(false);
    navigate('/login');

  }
  
  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>

        <div>
          {isLoggedin ? (
            <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
          ) : (
              <>
                <Button text="Login" className="btn-outline-info" url="login" />
                &nbsp;
                <Button text="Register" className="btn-info" url="/register" />
              </>
          )}
        </div>
      </nav>
    </>
  )
}
