export interface StatusDTO {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  companyId?: string;
  resourceId?: string;
}
