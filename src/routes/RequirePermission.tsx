import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store';
import { useAuth } from 'context/AuthContext';
import { ModuleKey } from 'store/slices/permissionsSlice';

interface RequirePermissionProps {
  permKey: ModuleKey;
  children: JSX.Element;
}

const RequirePermission: React.FC<RequirePermissionProps> = ({ permKey, children }) => {
  const { user } = useAuth();
  const userPermissions =
    useAppSelector((state: RootState) => state.permissions.data[user?.id || '']) || {};

  if (userPermissions[permKey] === false) {
    return <Navigate to="/dashboard/acesso-negado" replace />;
  }

  return children;
};

export default RequirePermission;
