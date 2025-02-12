import React, { useState } from 'react';
import { BaseCompanyDTO } from 'types/companies';
import { CreateCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';
import { FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import { FormContainer, FormTitle, Section, SectionHeader, FormRow, Label, InputField, ErrorText, SubmitButton } from '../styles/companiesStyles';
import { ValidationErrors, validateCompanyForm } from '../validate/companyFormValidation';

type CompanyFormProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (company: CreateCompanyDTO, user: CreateUserDTO) => void;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ loading, error, onSubmit }) => {
  const [company, setCompany] = useState<BaseCompanyDTO>({
    code: '',
    document: '',
    name: '',
    trade: '',
    municipalRegistration: '',
    stateRegistration: '',
    active: true,
    zipCode: '',
    street: '',
    complement: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [user, setUser] = useState<CreateUserDTO>({
    name: '',
    email: '',
    phone: '',
    password: '',
    active: true,
    companyId: '',
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Manipulação dos inputs dos dados da empresa
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  // Manipulação dos inputs dos dados do usuário
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateCompanyForm({ company, user, confirmPassword });
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    onSubmit(company as CreateCompanyDTO, user);
  };

  return (
    <FormContainer>
      <FormTitle>
        <FaBuilding style={{ marginRight: '0.5rem' }} />
        Cadastro de Empresa e Usuário
      </FormTitle>
      <form onSubmit={handleSubmit}>
        {/* Seção: Dados da Empresa */}
        <Section>
          <SectionHeader>
            <FaBuilding style={{ marginRight: '0.5rem' }} />
            Dados da Empresa
          </SectionHeader>
          <FormRow>
            <Label>
              Razão Social
              <InputField name="name" value={company.name} onChange={handleCompanyChange} />
              {validationErrors.companyName && <ErrorText>{validationErrors.companyName}</ErrorText>}
            </Label>
            <Label>
              Documento (CNPJ/CPF)
              <InputField name="document" value={company.document} onChange={handleCompanyChange} />
              {validationErrors.companyDocument && <ErrorText>{validationErrors.companyDocument}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Nome Fantasia
              <InputField name="trade" value={company.trade} onChange={handleCompanyChange} />
              {validationErrors.companyTrade && <ErrorText>{validationErrors.companyTrade}</ErrorText>}
            </Label>
            <Label>
              Código
              <InputField name="code" value={company.code} onChange={handleCompanyChange} />
              {validationErrors.companyCode && <ErrorText>{validationErrors.companyCode}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Inscrição Municipal
              <InputField name="municipalRegistration" value={company.municipalRegistration} onChange={handleCompanyChange} />
            </Label>
            <Label>
              Inscrição Estadual
              <InputField name="stateRegistration" value={company.stateRegistration} onChange={handleCompanyChange} />
            </Label>
          </FormRow>
        </Section>

        {/* Seção: Endereço */}
        <Section>
          <SectionHeader>
            <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
            Endereço
          </SectionHeader>
          <FormRow>
            <Label>
              CEP
              <InputField name="zipCode" value={company.zipCode} onChange={handleCompanyChange} />
              {validationErrors.zipCode && <ErrorText>{validationErrors.zipCode}</ErrorText>}
            </Label>
            <Label>
              Rua
              <InputField name="street" value={company.street} onChange={handleCompanyChange} />
              {validationErrors.street && <ErrorText>{validationErrors.street}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Complemento
              <InputField name="complement" value={company.complement} onChange={handleCompanyChange} />
              {validationErrors.complement && <ErrorText>{validationErrors.complement}</ErrorText>}
            </Label>
            <Label>
              Número
              <InputField name="number" value={company.number} onChange={handleCompanyChange} />
              {validationErrors.number && <ErrorText>{validationErrors.number}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Bairro
              <InputField name="neighborhood" value={company.neighborhood} onChange={handleCompanyChange} />
              {validationErrors.neighborhood && <ErrorText>{validationErrors.neighborhood}</ErrorText>}
            </Label>
            <Label>
              Cidade
              <InputField name="city" value={company.city} onChange={handleCompanyChange} />
              {validationErrors.city && <ErrorText>{validationErrors.city}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Estado
              <InputField name="state" value={company.state} onChange={handleCompanyChange} />
              {validationErrors.state && <ErrorText>{validationErrors.state}</ErrorText>}
            </Label>
          </FormRow>
        </Section>

        {/* Seção: Usuário Administrador */}
        <Section>
          <SectionHeader>
            <FaUserTie style={{ marginRight: '0.5rem' }} />
            Usuário Administrador
          </SectionHeader>
          <FormRow>
            <Label>
              Nome
              <InputField name="name" value={user.name} onChange={handleUserChange} />
              {validationErrors.userName && <ErrorText>{validationErrors.userName}</ErrorText>}
            </Label>
            <Label>
              E-mail
              <InputField name="email" value={user.email} onChange={handleUserChange} />
              {validationErrors.userEmail && <ErrorText>{validationErrors.userEmail}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Telefone
              <InputField name="phone" value={user.phone} onChange={handleUserChange} />
              {validationErrors.userPhone && <ErrorText>{validationErrors.userPhone}</ErrorText>}
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Senha
              <InputField type="password" name="password" value={user.password} onChange={handleUserChange} />
              {validationErrors.userPassword && <ErrorText>{validationErrors.userPassword}</ErrorText>}
            </Label>
            <Label>
              Confirmar Senha
              <InputField
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {validationErrors.confirmPassword && <ErrorText>{validationErrors.confirmPassword}</ErrorText>}
            </Label>
          </FormRow>
        </Section>

        {error && <ErrorText>{error}</ErrorText>}

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar Empresa'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CompanyForm;
