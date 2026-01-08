import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

function PublicRoute({ children }) {
  const { isLoggedin } = useContext(AuthContext)
  
  if (isLoggedin) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

export default PublicRoute