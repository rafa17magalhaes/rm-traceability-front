import { CreateUserDTO } from 'types/users';

export interface UserFormValues {
  user: CreateUserDTO;
  confirmPassword: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateUserForm = ({
  user,
  confirmPassword,
}: UserFormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!user.name.trim()) {
    errors.userName = 'O nome é obrigatório.';
  }
  if (!user.email.trim()) {
    errors.userEmail = 'O e-mail é obrigatório.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.userEmail = 'O e-mail informado não é válido.';
    }
  }
  if (!user.phone.trim()) {
    errors.userPhone = 'O telefone é obrigatório.';
  }
  if (!user.password) {
    errors.userPassword = 'A senha é obrigatória.';
  } else if (user.password.length < 6) {
    errors.userPassword = 'A senha deve ter no mínimo 6 caracteres.';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'A confirmação da senha é obrigatória.';
  } else if (user.password !== confirmPassword) {
    errors.confirmPassword = 'As senhas não conferem.';
  }

  return errors;
};
