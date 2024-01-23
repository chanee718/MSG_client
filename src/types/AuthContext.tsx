import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthContextType {
    isLoggedIn: boolean;
    logIn: (id: string, rememberMe: boolean) => void;
    logOut: () => void;
  }

interface AuthProviderProps {
    children: ReactNode;
}
  

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 로그인 상태 확인
    const authToken = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');
    setIsLoggedIn(!!authToken);
  }, []);

  const logIn = (id: string, rememberMe: boolean) => {
    // 로그인 처리 (localStorage 또는 sessionStorage 사용)

    if (rememberMe) {
      localStorage.setItem('loginMail', id);
    } else {
      sessionStorage.setItem('loginMail', id);
    }
    setIsLoggedIn(true);
  };

  const logOut = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);