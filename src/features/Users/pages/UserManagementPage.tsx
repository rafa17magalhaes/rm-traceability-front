import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { fetchAllUsers, createUserThunk, updateUserThunk } from 'store/slices/usersSlice';
import { ListContainer, ListTitle, AddButton } from '../styles/ListUsersStyles';
import { FaEdit, FaPlus } from 'react-icons/fa';
import UserForm from '../components/UserForm';
import { CreateUserDTO, UserDTO } from 'types/users';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import StatusToggle from 'components/StatusToggle/StatusToggle';

const UserManagementPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(Partial<CreateUserDTO> & { id: string }) | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleAddNew = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: Partial<CreateUserDTO> & { id: string }) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = async (userData: CreateUserDTO) => {
    if (selectedUser && selectedUser.id) {
      await dispatch(updateUserThunk({ id: selectedUser.id, dto: userData }));
    } else {
      await dispatch(createUserThunk(userData));
    }
    setSelectedUser(null);
    setShowForm(false);
    dispatch(fetchAllUsers());
    setShowCelebration(true);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  const handleToggleActive = async (user: UserDTO) => {
    const newActive = !user.active;
    await dispatch(updateUserThunk({ id: user.id, dto: { active: newActive } }));
    dispatch(fetchAllUsers());
  };

  const columns: ColumnDefinition<UserDTO>[] = [
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
          onToggle={() => handleToggleActive(user)}
          titleActive="Clique para desativar"
          titleInactive="Clique para ativar"
        />
      ),
    },
    {
      header: 'Ações',
      render: (user) => (
        <button
          onClick={() => handleEdit(user)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          title="Editar"
        >
          <FaEdit size={18} color="#00509e" />
        </button>
      ),
    },
  ];

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
          <AddButton onClick={handleAddNew}>
            <FaPlus size={16} style={{ marginRight: '0.5rem' }} />
            Adicionar Novo Usuário
          </AddButton>
        </div>
      )}

      {showForm ? (
        <UserForm
          loading={loading}
          error={error}
          onSubmit={handleFormSubmit}
          initialData={selectedUser || undefined}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {loading && <p style={{ textAlign: 'center' }}>Carregando usuários...</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>}
          {(!loading && list.length === 0) ? (
            <p style={{ textAlign: 'center' }}>Nenhum usuário encontrado.</p>
          ) : (
            <GenericList
              title="Lista de Usuários"
              data={list as UserDTO[]}
              columns={columns}
              loading={loading}
              error={error || undefined}
            />
          )}
        </>
      )}
    </ListContainer>
  );
};

export default UserManagementPage;
