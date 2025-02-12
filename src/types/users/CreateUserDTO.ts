import { BaseUserDTO } from './BaseUserDTO';

export interface CreateUserDTO extends BaseUserDTO {
  password: string;
}
