import { CompanyDTO } from "types/companies";

export interface BaseUserDTO {
    name: string;
    email: string;
    phone: string;
    active?: boolean;
    company?: CompanyDTO;
    companyId?: string;
  }
  