import { createContext, useState } from 'react';

const AuthContext = createContext({
  isUserLoggedIn: false,
  setUserLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
  username: null,
  setUsername: () => {},
});

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const setUserLoggedIn = (loggedIn) => {
    setIsUserLoggedIn(loggedIn);
  };

  return (
    <AuthContext.Provider value={{ 
      isUserLoggedIn, 
      setUserLoggedIn, 
      userId, 
      setUserId, 
      username,
      setUsername 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;