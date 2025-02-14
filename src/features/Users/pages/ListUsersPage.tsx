import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { fetchAllUsers, removeUserThunk } from 'store/slices/usersSlice';
import { ListContainer, ListTitle, UserList, UserCard } from '../styles/ListUsersStyles';

const ListUsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removeUserThunk(id));
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
                  <button onClick={() => handleRemove(user.id)}>Remover</button>
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
