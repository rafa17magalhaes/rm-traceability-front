import api from './api';

import {
  CompanyDTO,
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from 'types/companies';

export const createCompany = async (
  createCompanyDTO: CreateCompanyDTO,
): Promise<CompanyDTO> => {
  const response = await api.post('/companies', createCompanyDTO);
  return response.data;
};

export const findAllCompanies = async (): Promise<CompanyDTO[]> => {
  const response = await api.get('/companies');
  return response.data;
};

export const findOneCompany = async (id: string): Promise<CompanyDTO> => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

export const updateCompany = async (
  id: string,
  updateCompanyDTO: UpdateCompanyDTO,
): Promise<CompanyDTO> => {
  const response = await api.put(`/companies/${id}`, updateCompanyDTO);
  return response.data;
};
export const removeCompany = async (id: string): Promise<void> => {
  await api.delete(`/companies/${id}`);
};
