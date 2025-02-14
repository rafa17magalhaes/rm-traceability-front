import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { CreateUserDTO } from 'types/users';
import { createUserThunk } from 'store/slices/usersSlice';

const AddUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.users);

  const handleSubmit = async (user: CreateUserDTO) => {
    const resultAction = await dispatch(createUserThunk(user));
    if (createUserThunk.fulfilled.match(resultAction)) {
      navigate('/dashboard/usuarios');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <UserForm loading={loading} error={error} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddUserPage;
