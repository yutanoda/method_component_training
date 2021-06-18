import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
}); 

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedsIn');
    
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.removeItem('isLoggedsIn');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem('isLoggedsIn', '1');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn, 
        onLogout: logoutHandler,
        onLogin: loginHandler
      
      }}>{props.children}
    </AuthContext.Provider>)
};

export default AuthContext;