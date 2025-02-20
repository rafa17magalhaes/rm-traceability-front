import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { bulkGenerateCodesThunk } from 'store/slices/codesSlice';
import {
  CodesContainer,
  CodesTitle,
  GenerateForm,
  InputField,
  Button,
  FormCard,
  Subtitle,
  MessageContainer,
  SpinnerContainer,
  Spinner
} from '../styles/CodesStyles';

const BulkGenerateCodesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.codes);

  const [quantity, setQuantity] = useState<number>(1);
  const [localError, setLocalError] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1) {
      setLocalError('Por favor, insira um valor maior ou igual a 1.');
      return;
    }
    setLocalError(null);
    setWaiting(true);

    setTimeout(() => {
      dispatch(bulkGenerateCodesThunk({ quantity }));
      setWaiting(false);
    }, 1500);
  };

  return (
    <CodesContainer>
      <CodesTitle>Gerar Códigos em Lote</CodesTitle>
      <Subtitle>Escolha quantos códigos deseja gerar de uma só vez.</Subtitle>

      <FormCard>
        <GenerateForm onSubmit={handleGenerate}>
          <InputField
            type="number"
            min={1}
            value={quantity}
            disabled={loading || waiting}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantidade"
          />
          <Button type="submit" disabled={loading || waiting}>
            Gerar
          </Button>
        </GenerateForm>

        {localError && (
          <MessageContainer style={{ backgroundColor: '#ffe6e6', color: '#cc0000' }}>
            {localError}
          </MessageContainer>
        )}
      </FormCard>

      {waiting && (
        <SpinnerContainer>
          <Spinner />
          <span>Aguarde...</span>
        </SpinnerContainer>
      )}

      {!waiting && loading && (
        <SpinnerContainer>
          <Spinner />
          <span>Gerando códigos, aguarde...</span>
        </SpinnerContainer>
      )}

      {error && (
        <MessageContainer style={{ backgroundColor: '#ffe6e6', color: '#cc0000' }}>
          Erro: {error}
        </MessageContainer>
      )}

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Após gerar, você pode ir para a <strong>Listagem</strong> para ver todos os códigos.
      </p>
    </CodesContainer>
  );
};

export default BulkGenerateCodesPage;
