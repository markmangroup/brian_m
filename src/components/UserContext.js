import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  userName: '',
  setUserName: () => {}
});

export function UserProvider({ children }) {
  const [userName, setUserNameState] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('userName');
    if (stored) setUserNameState(stored);
  }, []);

  const setUserName = (name) => {
    setUserNameState(name);
    if (name) {
      localStorage.setItem('userName', name);
    } else {
      localStorage.removeItem('userName');
    }
  };

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
