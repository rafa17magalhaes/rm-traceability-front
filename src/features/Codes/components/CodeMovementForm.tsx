import React, { useState } from 'react';

import { CodeDTO } from 'types/codes/CodeDTO';
import { StatusDTO } from 'types/status';
import { ResourceDTO } from 'types/resources';

import LoadingButton from 'components/Button/LoadingButton';
import {
  FormRow,
  Label,
  AddedCodesContainer,
  CodeChip,
  QRImage,
  RemoveButton,
  SelectField,
  ProductPreviewContainer,
  TextareaField,
  ErrorText,
  InputField,
} from '../styles/CodeMovementStyles';

interface CodeMovementFormProps {
  codesList: CodeDTO[];
  statusList: StatusDTO[];
  resourcesList: ResourceDTO[];
  isLoading?: boolean;
  processing?: boolean;
  globalError?: string | null;
  onSubmitCodeStatus: (
    addedCodes: CodeDTO[],
    selectedStatus: string,
    observation: string,
    selectedResource?: string
  ) => Promise<boolean>;
  onSuccess: () => void;
}

const CodeMovementForm: React.FC<CodeMovementFormProps> = ({
  codesList,
  statusList,
  resourcesList,
  isLoading = false,
  processing = false,
  globalError,
  onSubmitCodeStatus,
  onSuccess,
}) => {
  const [valueCodeInput, setValueCodeInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [observation, setObservation] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [addedCodes, setAddedCodes] = useState<CodeDTO[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  const isStatusAtivado = () => {
    const st = statusList.find((s) => s.id === selectedStatus);
    return st?.name.toLowerCase() === 'ativado';
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    if (!isStatusAtivado()) {
      setSelectedResource('');
    }
  };

  const handleAddCode = () => {
    if (!valueCodeInput.trim()) {
      setLocalError('Digite um código.');
      return;
    }
    setLocalError(null);
    const foundCode = codesList.find(
      (code) =>
        code.value.toLowerCase() === valueCodeInput.trim().toLowerCase() ||
        code.qrCodeUrl?.toLowerCase() === valueCodeInput.trim().toLowerCase()
    );
    if (!foundCode) {
      setLocalError(`Nenhum código encontrado com "${valueCodeInput}".`);
      return;
    }
    if (addedCodes.some((c) => c.id === foundCode.id)) {
      setLocalError('Código já adicionado.');
      return;
    }
    setAddedCodes([...addedCodes, foundCode]);
    setValueCodeInput('');
  };

  const handleRemoveCode = (codeId: string) => {
    setAddedCodes(addedCodes.filter((c) => c.id !== codeId));
  };

  const selectedResourceObj = resourcesList.find((res) => res.id === selectedResource);

  const handleSubmit = async () => {
    if (addedCodes.length === 0 || !selectedStatus) {
      setLocalError('Adicione pelo menos um código e selecione um status.');
      return;
    }
    if (isStatusAtivado() && !selectedResource) {
      setLocalError('Selecione um recurso para o status "Ativado".');
      return;
    }
    setLocalError(null);
    const success = await onSubmitCodeStatus(
      addedCodes,
      selectedStatus,
      observation,
      isStatusAtivado() ? selectedResource : undefined
    );
    if (success) {
      onSuccess();
      setAddedCodes([]);
      setSelectedStatus('');
      setObservation('');
      setSelectedResource('');
    } else {
      setLocalError('Falha ao atualizar um ou mais códigos.');
    }
  };

  return (
    <>
      <FormRow>
        <Label>Código (Valor ou QR)</Label>
        <InputField
          placeholder="Digite o valor do código"
          value={valueCodeInput}
          onChange={(e) => setValueCodeInput(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <LoadingButton
          onClick={handleAddCode}
          loadingDelay={500}
          style={{ alignSelf: 'flex-end', padding: '0.4rem 0.8rem' }}
        >
          Adicionar Código
        </LoadingButton>
      </FormRow>

      {addedCodes.length > 0 && (
        <AddedCodesContainer>
          {addedCodes.map((code) => {
            const codeResource = code.resource;
            return (
              <CodeChip key={code.id}>
                {code.qrCodeUrl && <QRImage src={code.qrCodeUrl} alt="QR" />}
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.5rem' }}>
                  <p style={{ fontSize: '1rem', margin: 0, color: '#fff' }}>{code.value}</p>
                  {codeResource ? (
                    <p
                      style={{
                        fontSize: '0.9rem',
                        margin: '4px 0 0 0',
                        color: '#fff',
                        padding: '2px 6px',
                        width: 'fit-content',
                      }}
                    >
                      Produto: {codeResource.name}
                    </p>
                  ) : (
                    <p style={{ fontSize: '0.8rem', margin: '4px 0 0 0', color: '#ccc' }}>
                      Produto não informado
                    </p>
                  )}
                  <p style={{ fontSize: '0.8rem', margin: '4px 0 0 0', color: '#fff' }}>
                    Último evento: {code.status?.name || 'N/A'}
                  </p>
                </div>
                <RemoveButton onClick={() => handleRemoveCode(code.id)}>&times;</RemoveButton>
              </CodeChip>
            );
          })}
        </AddedCodesContainer>
      )}

      <FormRow>
        <Label>Status</Label>
        <SelectField value={selectedStatus} onChange={handleStatusChange}>
          <option value="">Selecione um status</option>
          {statusList.map((st) => (
            <option key={st.id} value={st.id}>
              {st.name}
            </option>
          ))}
        </SelectField>
      </FormRow>

      {isStatusAtivado() && (
        <FormRow>
          <Label>Recurso (Produto)</Label>
          <SelectField value={selectedResource} onChange={(e) => setSelectedResource(e.target.value)}>
            <option value="">Selecione um recurso</option>
            {resourcesList.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </SelectField>
        </FormRow>
      )}

      {isStatusAtivado() && selectedResourceObj && (
        <FormRow style={{ alignItems: 'center' }}>
          <Label>Pré-visualização do Produto</Label>
          <ProductPreviewContainer>
            <img
              src={selectedResourceObj.imageUrl}
              alt={selectedResourceObj.name}
              style={{ width: '130px', height: '130px', borderRadius: '10px' }}
            />
          </ProductPreviewContainer>
        </FormRow>
      )}

      <FormRow>
        <Label>Observação</Label>
        <TextareaField
          placeholder="Observações sobre a movimentação"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />
      </FormRow>

      {(localError || globalError) && (
        <ErrorText>{localError || globalError}</ErrorText>
      )}

      <FormRow style={{ textAlign: 'center' }}>
        <LoadingButton
          onClick={handleSubmit}
          loadingDelay={1500}
          disabled={isLoading || processing}
          style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}
        >
          {isLoading || processing ? 'Carregando...' : 'Confirmar Movimentação'}
        </LoadingButton>
      </FormRow>
    </>
  );
};

export default CodeMovementForm;
