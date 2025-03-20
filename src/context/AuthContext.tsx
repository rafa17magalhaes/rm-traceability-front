import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserDTO } from 'types/users';

interface AuthContextType {
  token: string | null;
  user: UserDTO | null;
  isAuthenticated: boolean;
  login: (newToken: string, newUser?: UserDTO) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState<UserDTO | null>(null);

  const login = async (newToken: string, newUser?: UserDTO) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);

    if (newUser) {
      setUser(newUser);
    } else {
      console.warn('Token encontrado, mas dados do usuário ausentes. Considere retornar o usuário no login.');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const isAuthenticated = token !== null;

  useEffect(() => {
    if (token && !user) {
      console.warn('Token encontrado, mas dados do usuário ausentes. Considere retornar o usuário no login.');
    }
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
