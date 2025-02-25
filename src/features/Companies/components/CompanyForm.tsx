import React, { useState, useEffect } from 'react';
import { BaseCompanyDTO } from 'types/companies';
import { CreateCompanyDTO } from 'types/companies';
import { CreateUserDTO } from 'types/users';
import { FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import { 
  FormContainer, 
  FormTitle, 
  Section, 
  SectionHeader, 
  FormRow, 
  Label, 
  InputField, 
  ErrorText 
} from '../styles/companiesStyles';
import { ValidationErrors, validateCompanyForm } from '../validate/companyFormValidation';
import LoadingButton from 'components/Button/LoadingButton';
import { ButtonRow } from 'features/Users/styles/StyledComponentsUsers';

type CompanyFormProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (company: CreateCompanyDTO, user: CreateUserDTO) => void;
  initialData?: CreateCompanyDTO | null;
  onCancel?: () => void;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ loading, error, onSubmit, initialData, onCancel }) => {
  const [company, setCompany] = useState<BaseCompanyDTO>({
    id: '', 
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

  useEffect(() => {
    if (initialData) {
      setCompany((prev) => ({
        ...prev,
        ...initialData,
        name: initialData.name || '',
        code: initialData.code || '',
        document: initialData.document || '',
        trade: initialData.trade || '',
      }));
    }
  }, [initialData]);
  

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const doSubmit = () => {
    let errors;
    if (initialData) {
      errors = validateCompanyForm({ company, user, confirmPassword }, true);
    } else {
      errors = validateCompanyForm({ company, user, confirmPassword });
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
  
    let companyPayload: CreateCompanyDTO;
    if (!initialData) {
      const { id, ...rest } = company;
      companyPayload = rest as CreateCompanyDTO;
    } else {
      companyPayload = company as CreateCompanyDTO;
    }
    onSubmit(companyPayload, user);
  };

  return (
    <FormContainer>
      <FormTitle>
        <FaBuilding style={{ marginRight: '0.5rem' }} />
        Cadastro de Empresa {initialData ? '(Atualização)' : 'e Usuário'}
      </FormTitle>
      <form onSubmit={(e) => e.preventDefault()}>
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

        {/* Seção: Usuário Administrador – renderizada somente para novo cadastro */}
        {!initialData && (
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
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <ButtonRow>
        <LoadingButton
          onClick={doSubmit}
          loadingDelay={1500}
          disabled={loading}
          style={{ marginRight: '1rem' }}
        >
          {loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar Empresa'}
        </LoadingButton>
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default CompanyForm;
