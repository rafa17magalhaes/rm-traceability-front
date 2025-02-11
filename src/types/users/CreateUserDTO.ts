// src/types/users/CreateUserDTO.ts
import { BaseUserDTO } from './BaseUserDTO';

export interface CreateUserDTO extends BaseUserDTO {
  password: string;
}
