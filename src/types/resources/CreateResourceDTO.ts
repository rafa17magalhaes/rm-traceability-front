export interface CreateResourceDTO {
  name: string;
  description: string;
  active?: boolean;
  companyId?: string;
  imageUrl?: string;
  file?: File;
}
