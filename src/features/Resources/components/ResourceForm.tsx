import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  FormTitle,
  FormRow,
  Label,
  InputField,
  CheckboxField,
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
  ErrorText,
  FieldSet,
  Legend,
} from '../styles/StyledComponentsResources';
import { validateResourceForm, ResourceFormValues } from '../validate/resourceFormValidation';
import { CreateResourceDTO } from 'types/resources/CreateResourceDTO';
import { UpdateResourceDTO } from 'types/resources/UpdateResourceDTO';

type ResourceFormProps = {
  loading: boolean;
  error: string | null;
  initialData?: (CreateResourceDTO & { id?: string }) | null;
  onSubmit: (data: CreateResourceDTO | UpdateResourceDTO) => void;
  onCancel?: () => void;
};

const ResourceForm: React.FC<ResourceFormProps> = ({
  loading,
  error,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const isEdit = !!initialData?.id;

  const [form, setForm] = useState<ResourceFormValues>({
    name: '',
    description: '',
    active: true,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        active: initialData.active ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateResourceForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit(form);
  };

  return (
    <FormContainer>
      <FormTitle>{isEdit ? 'Editar Produto' : 'Novo Produto'}</FormTitle>

      <form onSubmit={handleSubmit}>
        <FieldSet>
          <Legend>Informações Gerais</Legend>

          <FormRow>
            <Label>Nome</Label>
            <InputField
              name="name"
              placeholder="Ex: nome do produto..."
              value={form.name}
              onChange={handleChange}
              required
            />
            {formErrors.name && <ErrorText>{formErrors.name}</ErrorText>}
          </FormRow>

          <FormRow>
            <Label>Descrição</Label>
            <InputField
              name="description"
              placeholder="Ex: descrição do produto..."
              value={form.description}
              onChange={handleChange}
              required
            />
            {formErrors.description && <ErrorText>{formErrors.description}</ErrorText>}
          </FormRow>

          <FormRow>
            <Label>
              <CheckboxField
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Ativo
            </Label>
          </FormRow>
        </FieldSet>

        {error && <ErrorText>{error}</ErrorText>}

        <ButtonRow>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Salvar'}
          </PrimaryButton>
          {onCancel && (
            <SecondaryButton type="button" onClick={onCancel} disabled={loading}>
              Cancelar
            </SecondaryButton>
          )}
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default ResourceForm;
