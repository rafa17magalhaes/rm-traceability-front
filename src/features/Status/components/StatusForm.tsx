import React from 'react';
import { CreateStatusDTO } from 'types/status/CreateStatusDTO';
import { UpdateStatusDTO } from 'types/status/UpdateStatusDTO';
import LoadingButton from 'components/Button/LoadingButton';
import { FormContainer, FormTitle, FormGroup, Label, Input, TextArea, CheckboxContainer } from '../styles/StatusFormStyles';


interface StatusFormProps {
  formData: CreateStatusDTO | UpdateStatusDTO;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string | null;
  editing?: boolean;
}

const StatusForm: React.FC<StatusFormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  editing,
}) => {
  return (
    <FormContainer>
      <FormTitle>{editing ? 'Editar Status' : 'Novo Status'}</FormTitle>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Descrição:</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={onChange}
            rows={4}
          />
        </FormGroup>

        <FormGroup>
          <Label>Ativo?</Label>
          <CheckboxContainer>
            <Input
              type="checkbox"
              name="active"
              checked={!!formData.active}
              onChange={onChange}
            />
          </CheckboxContainer>
        </FormGroup>

        <LoadingButton
          type="button" 
          loading={loading}
          loadingDelay={1500}
          onClick={onSubmit}
          style={{ width: '100%' }}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </LoadingButton>
      </form>
    </FormContainer>
  );
};

export default StatusForm;
