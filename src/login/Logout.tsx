import React, { useState } from 'react';
import { useAuth } from '../types/AuthContext';

const Logout = () => {

  const { logOut } = useAuth();
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    logOut();
    localStorage.removeItem('loginMail');
    sessionStorage.removeItem('loginMail');
  };

  const hoverStyle = {
    margin: '0',
    fontFamily: 'Bold',
    fontSize: '1.2rem',
    color: hover ? 'orangered' : 'white', // 호버 여부에 따라 색상 변경
    cursor: 'pointer',
  };

  return (
    <a 
      href="" 
      onClick={handleLogout} 
      style={hoverStyle}
      onMouseEnter={() => setHover(true)} // 마우스를 올렸을 때
      onMouseLeave={() => setHover(false)} // 마우스를 뗐을 때
      >
      Logout
    </a>
  );
};

export default Logout;