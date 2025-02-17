import React, { useState, useEffect } from 'react';
import { CreateUserDTO } from 'types/users';
import { FaUser } from 'react-icons/fa';
import { 
  FormContainer, 
  FormTitle, 
  Section, 
  FormRow, 
  Label, 
  InputField, 
  ErrorText, 
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
  LoadingSpinner
} from '../styles/StyledComponentsUsers';
import { ValidationErrors, validateUserForm } from '../validade/userFormValidation';

interface UserFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (user: CreateUserDTO) => void;
  initialData?: Partial<CreateUserDTO> & { id?: string };
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ loading, error, onSubmit, initialData, onCancel }) => {
  // Se for edição, senha pode ser opcional; senão, obrigatória
  const [user, setUser] = useState<CreateUserDTO>({
    name: '',
    email: '',
    phone: '',
    password: '',
    active: true,
    ...initialData,
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const isEdit = !!(initialData && initialData.id);

  useEffect(() => {
    if (initialData) {
      setUser({
        ...user,
        ...initialData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateUserForm({ user, confirmPassword });
    setValidationErrors(errors);
  
    if (Object.keys(errors).length > 0) return;
    onSubmit(user);
  };

  return (
    <FormContainer>
      <FormTitle>
        <FaUser style={{ marginRight: '0.5rem' }} />
        {isEdit ? 'Atualizar Usuário' : 'Cadastro de Usuário'}
      </FormTitle>
      <form onSubmit={handleSubmit}>
        <Section>
          <FormRow>
            <Label>
              Nome
              <InputField 
                name="name" 
                value={user.name} 
                onChange={handleChange} 
                required
              />
              {validationErrors.userName && <ErrorText>{validationErrors.userName}</ErrorText>}
            </Label>
            <Label>
              E-mail
              <InputField 
                name="email" 
                value={user.email} 
                onChange={handleChange} 
                required
              />
              {validationErrors.userEmail && <ErrorText>{validationErrors.userEmail}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Telefone
              <InputField 
                name="phone" 
                value={user.phone} 
                onChange={handleChange} 
                required
              />
              {validationErrors.userPhone && <ErrorText>{validationErrors.userPhone}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Senha
              <InputField 
                type="password" 
                name="password" 
                value={user.password} 
                onChange={handleChange} 
                required={!isEdit}
              />
              {validationErrors.userPassword && <ErrorText>{validationErrors.userPassword}</ErrorText>}
            </Label>
            <Label>
              Confirmar Senha
              <InputField
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isEdit}
              />
              {validationErrors.confirmPassword && <ErrorText>{validationErrors.confirmPassword}</ErrorText>}
            </Label>
          </FormRow>
        </Section>
        {error && <ErrorText>{error}</ErrorText>}

        <ButtonRow>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : (isEdit ? 'Atualizar' : 'Salvar')}
          </PrimaryButton>
          {onCancel && (
            <SecondaryButton 
              type="button" 
              onClick={onCancel} 
              disabled={loading}
            >
              Cancelar
            </SecondaryButton>
          )}
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default UserForm;
