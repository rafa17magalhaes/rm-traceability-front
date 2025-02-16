import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { fetchAllUsers } from 'store/slices/usersSlice';
import { ListContainer, ListTitle, UserList, UserCard, EditButton } from '../styles/ListUsersStyles';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const ListUsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/dashboard/usuarios/${id}/edit`);
  };

  return (
    <ListContainer>
      <ListTitle>Lista de Usuários</ListTitle>
      {loading && <p style={{ textAlign: 'center' }}>Carregando usuários...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>}
      {!loading && !error && (
        <>
          {list.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Nenhum usuário encontrado.</p>
          ) : (
            <UserList>
              {list.map((user) => (
                <UserCard key={user.id}>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <EditButton onClick={() => handleEdit(user.id)} title="Editar">
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

export default ListUsersPage;
