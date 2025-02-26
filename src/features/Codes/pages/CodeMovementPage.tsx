import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  fetchAllCodesThunk,
  changeCodeStatusThunk,
} from 'store/slices/codesSlice';
import { fetchActiveStatusesThunk } from 'store/slices/statusesSlice';
import { fetchAllResourcesThunk } from 'store/slices/resourcesSlice';
import styled from 'styled-components';
import LoadingButton from 'components/Button/LoadingButton';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
  background: linear-gradient(135deg, #fdfdfd 0%, #eef2f7 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 600;
`;

const FormRow = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
`;

const InputField = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const SelectField = styled.select`
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const TextareaField = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.2s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const AddedCodesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const CodeChip = styled.div`
  background: rgba(36, 65, 83, 0.42);
  color: #fff;
  padding: 0.5rem 0.7rem;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
`;

const QRImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 0.75rem;
  border-radius: 5px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
`;

const Spacer = styled.div`
  height: 1rem;
`;

const ResourcePreview = styled.div`
  margin-top: 0.75rem;
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const CodeMovementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: codesList, loading: codesLoading, error: codesError } = useAppSelector((state) => state.codes);
  const { list: statusList, loading: statusLoading, error: statusError } = useAppSelector((state) => state.statuses);
  const { list: resourcesList } = useAppSelector((state) => state.resources);

  const [valueCodeInput, setValueCodeInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [observation, setObservation] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [addedCodes, setAddedCodes] = useState<any[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCodesThunk());
    dispatch(fetchActiveStatusesThunk());
    dispatch(fetchAllResourcesThunk());
  }, [dispatch]);

  const isStatusAtivado = () => {
    const st = statusList.find((s) => s.id === selectedStatus);
    return st?.name.toLowerCase() === 'ativado';
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
    const promises = addedCodes.map((code) =>
      dispatch(
        changeCodeStatusThunk({
          id: code.id,
          dto: {
            statusId: selectedStatus,
            observation,
            resourceId: isStatusAtivado() ? selectedResource : undefined,
          },
        })
      )
    );
    const results = await Promise.all(promises);
    if (results.every((res) => changeCodeStatusThunk.fulfilled.match(res))) {
      setShowCelebration(true);
      setAddedCodes([]);
      setSelectedStatus('');
      setObservation('');
      setSelectedResource('');
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } else {
      setLocalError('Falha ao atualizar um ou mais códigos.');
    }
  };

  const globalError = statusError || codesError;
  const isLoading = statusLoading || codesLoading;

  return (
    <Container>
      {showCelebration && (
        <CelebrationMessage
          message="Movimentação registrada com sucesso!"
          duration={3000}
        />
      )}
      <Title>Movimentar Código</Title>
      <FormRow>
        <Label>Código (Valor ou QR)</Label>
        <InputField
          placeholder="Ex: RM7FA5A107"
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
          {addedCodes.map((code) => (
            <CodeChip key={code.id}>
              {code.qrCodeUrl && <QRImage src={code.qrCodeUrl} alt="QR" />}
              {code.value}
              <RemoveButton onClick={() => handleRemoveCode(code.id)}>
                &times;
              </RemoveButton>
            </CodeChip>
          ))}
        </AddedCodesContainer>
      )}
      <FormRow>
        <Label>Status</Label>
        <SelectField
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
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
          <SelectField
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
          >
            <option value="">Selecione um recurso</option>
            {resourcesList.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </SelectField>
        </FormRow>
      )}
      {selectedResourceObj && (
        <FormRow>
          <Label>Pré-visualização do Produto</Label>
          <img
            src={selectedResourceObj.imageUrl}
            alt={selectedResourceObj.name}
            style={{ width: '130px', height: '130px', borderRadius: '10px', marginTop: '0.7rem' }}
          />
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
      {(localError || globalError) && <ErrorText>{localError || globalError}</ErrorText>}
      <FormRow style={{ textAlign: 'center' }}>
        <LoadingButton
          onClick={handleSubmit}
          loadingDelay={1500}
          disabled={isLoading}
          style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}
        >
          {isLoading ? 'Carregando...' : 'Confirmar Movimentação'}
        </LoadingButton>
      </FormRow>
    </Container>
  );
};

export default CodeMovementPage;
