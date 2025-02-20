import { BulkGenerateCodesDTO, CodeDTO, CreateCodeDTO } from 'types/codes';
import api from './api';

// Busca todos os códigos
export const fetchAllCodes = async (): Promise<CodeDTO[]> => {
  const response = await api.get('/codes');
  return response.data;
};

// Cria um código individual
export const createCode = async (dto: CreateCodeDTO): Promise<CodeDTO> => {
  const response = await api.post('/codes', dto);
  return response.data;
};

// Gera códigos em lote
export const bulkGenerateCodes = async (dto: BulkGenerateCodesDTO): Promise<CodeDTO[]> => {
  const response = await api.post('/codes/bulk-generate', dto);
  return response.data;
};
