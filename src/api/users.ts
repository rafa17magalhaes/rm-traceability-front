import { CreateUserDTO, UpdateUserDTO, UserDTO } from 'types/users';
import api from './api';

export const createUser = async (createUserDTO: CreateUserDTO): Promise<UserDTO> => {
  const response = await api.post('/users', createUserDTO);
  return response.data;  
};

export const findAllUsers = async (): Promise<UserDTO[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const findOneUser = async (id: string): Promise<UserDTO> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, updateUserDTO: UpdateUserDTO): Promise<UserDTO> => {
  const response = await api.put(`/users/${id}`, updateUserDTO);
  return response.data;
};

export const removeUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
