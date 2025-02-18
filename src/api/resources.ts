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
  const formData = new FormData();
  formData.append('name', dto.name);
  formData.append('description', dto.description);
  formData.append('active', dto.active ? 'true' : 'false');

  if (dto.file) {
    formData.append('file', dto.file);
  }
  const response = await api.post('/resources', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateResource = async (id: string, dto: UpdateResourceDTO): Promise<ResourceDTO> => {
  const formData = new FormData();
  if (dto.name !== undefined) {
    formData.append('name', dto.name);
  }
  if (dto.description !== undefined) {
    formData.append('description', dto.description);
  }
  if (dto.active !== undefined) {
    formData.append('active', dto.active ? 'true' : 'false');
  }
  if (dto.file) {
    formData.append('file', dto.file);
  }
  const response = await api.put(`/resources/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const removeResource = async (id: string): Promise<void> => {
  await api.delete(`/resources/${id}`);
};
