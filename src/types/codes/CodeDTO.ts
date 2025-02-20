import { ResourceDTO } from "types/resources";

export interface CodeDTO {
    id: string;
    value: string;
    qrCodeUrl?: string;
    statusId?: string;
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
