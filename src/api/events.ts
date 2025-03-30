import api from './api';

import { EventDTO, CreateEventDTO } from 'types/events';
import { QueryParamsDTO, PaginationDTO } from 'types/pagination';

// Cria um novo Event
export const createEvent = async (dto: CreateEventDTO): Promise<EventDTO> => {
  const response = await api.post('/events', dto);
  return response.data;
};

// Busca todos os Events com paginação
export const findAllEvents = async (
  queryParams: QueryParamsDTO,
): Promise<PaginationDTO<EventDTO>> => {
  const response = await api.get('/events', { params: queryParams });
  return response.data;
};

// Busca Events filtrando por codeId
export const findEventsByCodeId = async (
  codeId: string,
): Promise<EventDTO[]> => {
  const response = await api.get('/events/by-code', {
    params: { codeId },
  });
  return response.data;
};

// Busca Events filtrando por statusId
export const findEventsByStatusId = async (
  statusId: string,
): Promise<EventDTO[]> => {
  const response = await api.get('/events/by-status', {
    params: { statusId },
  });
  return response.data;
};

// Marca um Event como lido
export const markEventAsRead = async (id: string): Promise<EventDTO> => {
  const response = await api.patch(`/events/${id}/mark-as-read`);
  return response.data; // retorna o Event atualizado (com isRead = true)
};
