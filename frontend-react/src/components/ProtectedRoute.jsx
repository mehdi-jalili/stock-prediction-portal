import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

function ProtectedRoute({ children }) {
  const { isLoggedin } = useContext(AuthContext)
  
  if (!isLoggedin) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute