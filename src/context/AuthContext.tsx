import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { UserDTO } from 'types/users';

interface AuthContextType {
  token: string | null;
  user: UserDTO | null;
  isAuthenticated: boolean;
  login: (newToken: string, newUser?: UserDTO) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );
  const [user, setUser] = useState<UserDTO | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (newToken: string, newUser?: UserDTO) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);

    if (newUser) {
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } else {
      console.warn('Token encontrado, mas dados do usuário ausentes...');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = token !== null;

  useEffect(() => {
    if (token && !user) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        console.warn('Token encontrado, mas sem user no localStorage.');
      }
    }
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
