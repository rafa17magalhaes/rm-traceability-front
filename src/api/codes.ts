import api from './api';
import { CodeDTO, CreateCodeDTO, BulkGenerateCodesDTO } from 'types/codes';
import { QueryParamsDTO, PaginationDTO } from 'types/pagination';

// Busca todos os códigos com paginação e ordenação
export const fetchAllCodes = async (
  queryParams: QueryParamsDTO,
): Promise<PaginationDTO<CodeDTO>> => {
  const response = await api.get('/codes', { params: queryParams });
  return response.data;
};

// Cria um código individual
export const createCode = async (dto: CreateCodeDTO): Promise<CodeDTO> => {
  const response = await api.post('/codes', dto);
  return response.data;
};

// Gera códigos em lote
export const bulkGenerateCodes = async (
  dto: BulkGenerateCodesDTO,
): Promise<CodeDTO[]> => {
  const response = await api.post('/codes/bulk-generate', dto);
  return response.data;
};

// Altera o status do código em events
export const changeCodeStatus = async (
  id: string,
  dto: { statusId: string; observation?: string },
): Promise<CodeDTO> => {
  const response = await api.patch(`/codes/${id}/move`, dto);
  return response.data;
};
