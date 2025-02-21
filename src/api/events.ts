import api from './api';
import { EventDTO, CreateEventDTO } from 'types/events';

// Cria um novo Event
export const createEvent = async (dto: CreateEventDTO): Promise<EventDTO> => {
  const response = await api.post('/events', dto);
  return response.data;
};

// Busca todos os Events
export const findAllEvents = async (): Promise<EventDTO[]> => {
  const response = await api.get('/events');
  return response.data;
};

// Busca Events filtrando por codeId
export const findEventsByCodeId = async (codeId: string): Promise<EventDTO[]> => {
  const response = await api.get('/events/by-code', {
    params: { codeId },
  });
  return response.data;
};

// Busca Events filtrando por statusId
export const findEventsByStatusId = async (statusId: string): Promise<EventDTO[]> => {
  const response = await api.get('/events/by-status', {
    params: { statusId },
  });
  return response.data;
};
