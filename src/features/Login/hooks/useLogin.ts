import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

export const useLogin = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useLogin deve ser usado dentro de um AuthProvider');
  }
  return context.login;
};
