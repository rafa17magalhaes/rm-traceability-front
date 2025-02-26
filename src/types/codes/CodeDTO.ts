import { ResourceDTO } from 'types/resources';
import { StatusDTO } from 'types/status';

export interface CodeDTO {
  id: string;
  value: string;
  qrCodeUrl?: string;
  statusId?: string;
  status: StatusDTO;
  companyId?: string;
  eventId?: string;
  resourceId?: string;
  resource?: ResourceDTO;
  currentState?: string;
  currentObservation?: string;
  block?: boolean;
  invoice?: string;
  driverName?: string;
  accessKey?: string;
}
