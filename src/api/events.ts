import api from './api';

import { EventDTO, CreateEventDTO } from 'types/events';
import { QueryParamsDTO, PaginationDTO } from 'types/pagination';

export const createEvent = async (dto: CreateEventDTO): Promise<EventDTO> => {
  const response = await api.post('/events', dto);
  return response.data;
};

export const findAllEvents = async (
  queryParams: QueryParamsDTO,
): Promise<PaginationDTO<EventDTO>> => {
  const response = await api.get('/events', { params: queryParams });
  return response.data;
};

export const findEventsByCodeId = async (
  codeId: string,
): Promise<EventDTO[]> => {
  const response = await api.get('/events/by-code', { params: { codeId } });
  return response.data;
};

export const findEventsByStatusId = async (
  statusId: string,
): Promise<EventDTO[]> => {
  const response = await api.get('/events/by-status', { params: { statusId } });
  return response.data;
};

// Marca um Event como lido
export const markEventAsRead = async (id: string): Promise<EventDTO> => {
  const response = await api.patch(`/events/${id}/mark-as-read`);
  return response.data;
};

// conta apenas as não-lidas
export const getUnreadCount = async (): Promise<{ count: number }> => {
  const response = await api.get('/events/unread/count');
  return response.data;
};
