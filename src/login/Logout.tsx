import React from 'react';
import { useAuth } from '../types/AuthContext';

const Logout = () => {

  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    localStorage.removeItem('loginMail');
    sessionStorage.removeItem('loginMail');
  };

  return (
    <a href="" onClick={handleLogout} style={{ margin: '0', fontFamily: 'Bold', fontSize: '1.2rem', color: 'white', cursor: 'pointer' }}>
      Logout
    </a>
  );
};

export default Logout;