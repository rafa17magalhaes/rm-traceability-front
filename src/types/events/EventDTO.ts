export interface EventDTO {
  id: string;
  codeId: string;
  valueCode: string;
  statusId: string;
  resourceId?: string;
  ip?: string;
  companyId?: string;
  urlCode?: string;
  observation?: string;
  longitude?: number;
  latitude?: number;
  userId?: string;
}
