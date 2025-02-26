import { BaseCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';

export interface CompanyFormValues {
  company: BaseCompanyDTO;
  user: CreateUserDTO;
  confirmPassword: string;
}

export interface ValidationErrors {
  [field: string]: string;
}

export const validateCompanyForm = (
  { company, user, confirmPassword }: CompanyFormValues,
  editing: boolean = false,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validações para a empresa
  if (!company.name?.trim()) {
    errors.companyName = 'A razão social é obrigatória.';
  }
  if (!company.document?.trim()) {
    errors.companyDocument = 'O documento (CNPJ/CPF) é obrigatório.';
  }
  if (!company.trade?.trim()) {
    errors.companyTrade = 'O nome fantasia é obrigatório.';
  }
  if (!company.code?.trim()) {
    errors.companyCode = 'O código é obrigatório.';
  }

  // Validações para o endereço
  if (!company.zipCode?.trim()) {
    errors.zipCode = 'O CEP é obrigatório.';
  }
  if (!company.street?.trim()) {
    errors.street = 'A rua é obrigatória.';
  }
  if (company.complement && !company.complement.trim()) {
    errors.complement = 'O complemento é obrigatório.';
  }
  if (!company.number?.trim()) {
    errors.number = 'O número é obrigatório.';
  }
  if (!company.neighborhood?.trim()) {
    errors.neighborhood = 'O bairro é obrigatório.';
  }
  if (!company.city?.trim()) {
    errors.city = 'A cidade é obrigatória.';
  }
  if (!company.state?.trim()) {
    errors.state = 'O estado é obrigatório.';
  }

  if (!editing) {
    if (!user.name?.trim()) {
      errors.userName = 'O nome do usuário é obrigatório.';
    }
    if (!user.email?.trim()) {
      errors.userEmail = 'O e-mail é obrigatório.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        errors.userEmail = 'O e-mail informado não é válido.';
      }
    }
    if (!user.phone?.trim()) {
      errors.userPhone = 'O telefone é obrigatório.';
    }
    if (!user.password) {
      errors.userPassword = 'A senha é obrigatória.';
    } else if (user.password.length < 6) {
      errors.userPassword = 'A senha deve ter ao menos 6 caracteres.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'A confirmação da senha é obrigatória.';
    } else if (user.password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não conferem.';
    }
  }
  return errors;
};
