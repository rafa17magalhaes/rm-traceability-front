export interface ResourceDTO {
  id: string;
  name: string;
  description: string;
  active: boolean;
  companyId?: string;
  imageUrl?: string;
  file?: File;
  createdAt?: string;
  updateAt?: string;
}
