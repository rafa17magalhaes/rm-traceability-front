import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaPlus } from 'react-icons/fa';

import { AppDispatch, RootState } from 'store';
import { fetchAllUsers, createUserThunk, updateUserThunk } from 'store/slices/usersSlice';
import { CreateUserDTO, UserDTO } from 'types/users';

import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import Pagination from 'components/Pagination/Pagination';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import StatusToggle from 'components/StatusToggle/StatusToggle';
import UserForm from '../components/UserForm';
import { ListContainer, ListTitle, AddButton } from '../styles/ListUsersStyles';

const UserManagementPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(Partial<CreateUserDTO> & { id: string }) | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const columns: ColumnDefinition<UserDTO>[] = [
    {
      header: 'Matrícula',
      render: (usr) => (usr.id ? usr.id.slice(0, 6).toUpperCase() : '------'),
    },
    {
      header: 'Nome',
      render: (user) => user.name,
    },
    {
      header: 'E-mail',
      render: (user) => user.email,
    },
    {
      header: 'Data de Criação',
      render: (user) =>
        user.createdAt ? new Date(user.createdAt).toLocaleString('pt-BR') : 'Sem data',
    },
    {
      header: 'Ativo',
      render: (user) => (
        <StatusToggle
          active={user.active}
          onToggle={() => dispatch(updateUserThunk({ id: user.id, dto: { active: !user.active } }))}
          titleActive="Clique para desativar"
          titleInactive="Clique para ativar"
        />
      ),
    },
    {
      header: 'Ações',
      render: (user) => (
        <button
          onClick={() => {
            setSelectedUser(user);
            setShowForm(true);
          }}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          title="Editar"
        >
          <FaEdit size={18} color="#00509e" />
        </button>
      ),
    },
  ];

  // PAGINAÇÃO: cálculo dos dados
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ListContainer>
      <ListTitle>Gerenciamento de Usuários</ListTitle>

      {showCelebration && (
        <CelebrationMessage
          message="Parabéns! Sua operação foi concluída com sucesso."
          duration={5000}
        />
      )}

      {!showForm && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <AddButton onClick={() => { setSelectedUser(null); setShowForm(true); }}>
            <FaPlus size={16} style={{ marginRight: '0.5rem' }} />
            Adicionar Novo Usuário
          </AddButton>
        </div>
      )}

      {showForm ? (
        <UserForm
          loading={loading}
          error={error}
          onSubmit={async (data) => {
            if (selectedUser && selectedUser.id) {
              await dispatch(updateUserThunk({ id: selectedUser.id, dto: data }));
            } else {
              await dispatch(createUserThunk(data));
            }
            setSelectedUser(null);
            setShowForm(false);
            dispatch(fetchAllUsers());
            setShowCelebration(true);
          }}
          initialData={selectedUser || undefined}
          onCancel={() => {
            setSelectedUser(null);
            setShowForm(false);
          }}
        />
      ) : (
        <>
          {loading && <p style={{ textAlign: 'center' }}>Carregando usuários...</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>}
          {(!loading && list.length === 0) ? (
            <p style={{ textAlign: 'center' }}>Nenhum usuário encontrado.</p>
          ) : (
            <>
              <GenericList
                title="Lista de Usuários"
                data={pageData}
                columns={columns}
                loading={loading}
                error={error || undefined}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </>
      )}
    </ListContainer>
  );
};

export default UserManagementPage;
