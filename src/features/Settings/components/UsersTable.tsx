import React from 'react';
import { FaUserLock } from 'react-icons/fa';

import { UserDTO } from 'types/users';

import LoadingButton from 'components/Button/LoadingButton';
import { TableContainer } from '../styles/UsersTableStyles';

interface UsersTableProps {
  data: UserDTO[];
  onOpenPermissions: (userId: string, userName: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ data, onOpenPermissions }) => {
  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th style={{ width: '120px' }}>Matrícula</th>
            <th style={{ width: '180px' }}>Nome</th>
            <th style={{ width: '300px' }}>E-mail</th>
            <th style={{ width: '150px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((usr) => (
            <tr key={usr.id}>
              <td>{usr.id ? usr.id.slice(0, 6).toUpperCase() : '------'}</td>
              <td>{usr.name}</td>
              <td>{usr.email}</td>
              <td>
                <LoadingButton
                  onClick={() => onOpenPermissions(usr.id, usr.name)}
                  loadingDelay={800}
                >
                  {/* Ícone + texto */}
                  <FaUserLock style={{ marginRight: '0.2rem' }} />
                  Nível de Acesso
                </LoadingButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default UsersTable;
