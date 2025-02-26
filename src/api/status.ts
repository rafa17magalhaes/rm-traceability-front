import api from './api';
import { StatusDTO, CreateStatusDTO, UpdateStatusDTO } from 'types/status';

// Cria um novo Status
export const createStatus = async (
  dto: CreateStatusDTO,
): Promise<StatusDTO> => {
  const response = await api.post('/status', dto);
  return response.data;
};

// Busca todos os Status
export const findAllStatus = async (): Promise<StatusDTO[]> => {
  const response = await api.get('/status');
  return response.data;
};

// Busca apenas os Status ativos
export const findActiveStatus = async (): Promise<StatusDTO[]> => {
  const response = await api.get('/status/active');
  return response.data;
};

// Busca um Status pelo ID
export const findOneStatus = async (id: string): Promise<StatusDTO> => {
  const response = await api.get(`/status/${id}`);
  return response.data;
};

// Busca um Status pelo nome (opcionalmente com companyId)
export const findStatusByName = async (
  name: string,
  companyId?: string,
): Promise<StatusDTO> => {
  const response = await api.get(`/status/by-name/${name}`, {
    params: { companyId },
  });
  return response.data;
};

// Atualiza um Status
export const updateStatus = async (
  id: string,
  dto: UpdateStatusDTO,
): Promise<StatusDTO> => {
  const response = await api.patch(`/status/${id}`, dto);
  return response.data;
};

// Remove um Status
export const removeStatus = async (id: string): Promise<void> => {
  await api.delete(`/status/${id}`);
};
