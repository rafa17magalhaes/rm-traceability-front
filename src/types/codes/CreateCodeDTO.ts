export interface CreateCodeDTO {
    value: string;
    qrCodeUrl?: string;
    statusId?: string;
    companyId?: string;
    eventId?: string;
    resourceId?: string;
    currentState?: string;
    currentObservation?: string;
    block?: boolean;
    invoice?: string;
    driverName?: string;
    accessKey?: string;
  }