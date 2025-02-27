import { CodeDTO } from 'types/codes';
import { CompanyDTO } from 'types/companies';
import { ResourceDTO } from 'types/resources';
import { StatusDTO } from 'types/status';
import { UserDTO } from 'types/users';

export interface EventDTO {
  id: string;
  codeId: string;
  code: CodeDTO;
  valueCode: string;
  statusId: string;
  status: StatusDTO;
  resourceId?: string;
  resource: ResourceDTO;
  ip?: string;
  companyId?: string;
  company: CompanyDTO;
  urlCode?: string;
  observation?: string;
  longitude?: number;
  latitude?: number;
  userId?: string;
  user: UserDTO;
  createdAt?: string;
  updateAt?: string;
}
