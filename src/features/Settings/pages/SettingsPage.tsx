import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllUsers } from 'store/slices/usersSlice';
import { RootState } from 'store';
import { useAuth } from 'context/AuthContext';

import CompanyCard from '../components/CompanyCard';
import UserPermissionsForm from '../components/UserPermissionsForm';
import LoadingButton from 'components/Button/LoadingButton';
import { UserDTO } from 'types/users';


import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import { SettingsContainer, SettingsContent, Title, CompanyCardWrapper, CardSection, ModalOverlay } from '../styles/SettingsPageStyles';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  // Carregamos a lista de usuários do Redux
  const { list: users, loading, error } = useAppSelector(
    (state: RootState) => state.users
  );

  // Estado para abrir/fechar modal de permissões
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleOpenPermissions = (userId: string, name: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(name);
  };

  const handleClosePermissions = () => {
    setSelectedUserId(null);
    setSelectedUserName('');
  };

  // Define as colunas para GenericList
  const columns: ColumnDefinition<UserDTO>[] = [
    {
        header: 'Matrícula',
        render: (usr) => {
          if (!usr.id) return '------';
          return usr.id.slice(0, 6).toUpperCase();
        },
      },
    {
      header: 'Nome',
      render: (usr) => usr.name,
    },
    {
      header: 'E-mail',
      render: (usr) => usr.email,
    },
    {
      header: 'Ações',
      render: (usr) => (
        <LoadingButton
          onClick={() => handleOpenPermissions(usr.id, usr.name)}
          loadingDelay={800}
          style={{ minWidth: '120px' }}
        >
          Nível de Acesso
        </LoadingButton>
      ),
    },
  ];

  return (
    <SettingsContainer>
      <SettingsContent>
        <Title>Configurações</Title>

        <CompanyCardWrapper>
          <CompanyCard />
        </CompanyCardWrapper>

        <CardSection>
          <GenericList
            title="Gerenciar Acesso dos Usuários"
            data={users}
            columns={columns}
            loading={loading}
            error={error}
          />
        </CardSection>
      </SettingsContent>

      {selectedUserId && (
        <ModalOverlay onClick={handleClosePermissions}>
          <UserPermissionsForm
            userId={selectedUserId}
            userName={selectedUserName}
            onClose={handleClosePermissions}
          />
        </ModalOverlay>
      )}
    </SettingsContainer>
  );
};

export default SettingsPage;
