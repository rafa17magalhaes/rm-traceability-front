import React, { useEffect, useState } from 'react';
import { FaUserShield, FaCog } from 'react-icons/fa';

import { fetchAllUsers } from 'store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store';

import Pagination from 'components/Pagination/Pagination';

import CompanyCard from '../components/CompanyCard';
import UserPermissionsForm from '../components/UserPermissionsForm';
import UsersTable from '../components/UsersTable';
import {
  SettingsContainer,
  SettingsContent,
  Title,
  CompanyCardWrapper,
  CardSection,
  ModalOverlay,
} from '../styles/SettingsPageStyles';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Lista de usuários do Redux
  const { list: users, loading, error } = useAppSelector(
    (state: RootState) => state.users
  );

  // Modal de permissões
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Lógica de paginação
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersPage = users.slice(startIndex, endIndex);

  return (
    <SettingsContainer>
      <SettingsContent>
        {/* Título principal com ícone de engrenagem */}
        <Title>
          <FaCog style={{ marginRight: '0.5rem' }} />
          Configurações
        </Title>

        <CompanyCardWrapper>
          <CompanyCard />
        </CompanyCardWrapper>

        <CardSection>
          {/* Subtítulo com ícone de “escudo de usuário” */}
          <h3
            style={{
              marginBottom: '1rem',
              color: '#333',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaUserShield />
            Gerenciar Acesso dos Usuários
          </h3>

          {loading && <p>Carregando usuários...</p>}
          {error && <p>Erro ao carregar usuários: {error}</p>}

          {!loading && !error && users.length > 0 && (
            <>
              <UsersTable data={usersPage} onOpenPermissions={handleOpenPermissions} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}

          {!loading && !error && users.length === 0 && (
            <p style={{ textAlign: 'center' }}>Nenhum usuário cadastrado.</p>
          )}
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
