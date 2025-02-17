import api from './api';
import { ResourceDTO } from 'types/resources/ResourceDTO';
import { CreateResourceDTO } from 'types/resources/CreateResourceDTO';
import { UpdateResourceDTO } from 'types/resources/UpdateResourceDTO';

export const fetchAllResources = async (): Promise<ResourceDTO[]> => {
  const response = await api.get('/resources');
  return response.data;
};

export const fetchActiveResources = async (): Promise<ResourceDTO[]> => {
  const response = await api.get('/resources/active');
  return response.data;
};

export const fetchOneResource = async (id: string): Promise<ResourceDTO> => {
  const response = await api.get(`/resources/${id}`);
  return response.data;
};

export const createResource = async (dto: CreateResourceDTO): Promise<ResourceDTO> => {
  const response = await api.post('/resources', dto);
  return response.data;
};

export const updateResource = async (id: string, dto: UpdateResourceDTO): Promise<ResourceDTO> => {
  const response = await api.put(`/resources/${id}`, dto);
  return response.data;
};

export const removeResource = async (id: string): Promise<void> => {
  await api.delete(`/resources/${id}`);
};
