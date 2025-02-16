import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { fetchAllUsers, createUserThunk, updateUserThunk } from 'store/slices/usersSlice';
import { ListContainer, ListTitle, UserList, UserCard, EditButton, AddButton } from '../styles/ListUsersStyles';
import { FaEdit, FaPlus } from 'react-icons/fa';
import UserForm from '../components/UserForm';
import { CreateUserDTO } from 'types/users';

const UserManagementPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(Partial<CreateUserDTO> & { id: string }) | null>(null);

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
      // Atualiza o usuário existente
      await dispatch(updateUserThunk({ id: selectedUser.id, dto: userData }));
    } else {
      // Cria um novo usuário
      await dispatch(createUserThunk(userData));
    }
    // Reseta o estado para voltar à listagem
    setSelectedUser(null);
    setShowForm(false);
    dispatch(fetchAllUsers());
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  return (
    <ListContainer>
      <ListTitle>Gerenciamento de Usuários</ListTitle>

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
            <UserList>
              {list.map((user) => (
                <UserCard key={user.id}>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <EditButton onClick={() => handleEdit(user)} title="Editar">
                    <FaEdit size={18} />
                  </EditButton>
                </UserCard>
              ))}
            </UserList>
          )}
        </>
      )}
    </ListContainer>
  );
};

export default UserManagementPage;
