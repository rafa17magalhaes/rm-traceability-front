import React, { useState, useEffect } from 'react';
import { validateResourceForm, ResourceFormValues } from '../validate/resourceFormValidation';
import { CreateResourceDTO } from 'types/resources/CreateResourceDTO';
import { UpdateResourceDTO } from 'types/resources/UpdateResourceDTO';
import {
  FormContainer,
  FormTitle,
  FieldSet,
  Legend,
  FormRow,
  Label,
  InputField,
  ErrorText,
  PreviewImage,
  HiddenFileInput,
  FileInputLabel,
  ButtonRow,
  SecondaryButton
} from '../styles/StyledComponentsResources';
import LoadingButton from 'components/Button/LoadingButton';

type ResourceFormProps = {
  loading: boolean;
  error: string | null;
  initialData?: (CreateResourceDTO & { id?: string; imageUrl?: string }) | null;
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
    ...initialData,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const doSubmit = () => {
    const errors = validateResourceForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit({ ...form, file: selectedFile || undefined });
  };

  return (
    <FormContainer>
      <FormTitle>{isEdit ? 'Editar Produto' : 'Novo Produto'}</FormTitle>

      <form onSubmit={(e) => e.preventDefault()}>
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

          {isEdit && initialData?.imageUrl && (
            <FormRow>
              <Label>Imagem Atual</Label>
              <img
                src={initialData.imageUrl}
                alt="Imagem do produto"
                style={{ width: '150px', borderRadius: '8px', marginBottom: '1rem' }}
              />
            </FormRow>
          )}

          <FormRow>
            <Label>Imagem (opcional)</Label>
            <HiddenFileInput
              id="file"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
            <FileInputLabel htmlFor="file">
              Selecionar imagem do produto
            </FileInputLabel>

            {selectedFile && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>Pré-visualização:</p>
                <PreviewImage
                  src={URL.createObjectURL(selectedFile)}
                  alt="Pré-visualização"
                />
              </div>
            )}
          </FormRow>
        </FieldSet>

        {error && <ErrorText>{error}</ErrorText>}

        <ButtonRow>
          <LoadingButton
            loadingDelay={1500}
            onClick={doSubmit}
            disabled={loading}
            style={{ marginRight: '1rem' }}
          >
            {isEdit ? 'Atualizar' : 'Cadastrar'}
          </LoadingButton>

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
