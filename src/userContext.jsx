import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Clear pre-existing token and userId when the component initializes
  useEffect(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }, []);

  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);

    // Set a timeout to clear the token and userId after 1 hour
    const clearLocalStorage = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      setUserId(null);
      setToken(null);
    };

    const timeoutId = setTimeout(clearLocalStorage, 60 * 60 * 1000); // 1 hour in milliseconds

    // Clear the timeout if the component unmounts or if userId or token changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userId, token]);

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
