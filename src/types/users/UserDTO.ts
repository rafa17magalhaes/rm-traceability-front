import { CompanyDTO } from 'types/companies';
import { BaseUserDTO } from './BaseUserDTO';

export interface UserDTO extends BaseUserDTO {
  id: string;
  company?: CompanyDTO;
  companyId?: string;
}
