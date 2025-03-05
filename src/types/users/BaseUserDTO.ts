import { CompanyDTO } from 'types/companies';

export interface BaseUserDTO {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  password?: string;
  company?: CompanyDTO;
  companyId?: string;
  createdAt?: string;
  updateAt?: string;
}
