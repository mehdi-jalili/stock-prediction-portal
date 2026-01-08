import { useState, useContext, createContext, useEffect } from 'react'

const AuthContext = createContext();

function AuthProvider({children}) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedin(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedin, setIsLoggedin}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export {AuthContext};