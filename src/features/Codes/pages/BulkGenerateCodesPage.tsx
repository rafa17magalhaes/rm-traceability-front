import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { bulkGenerateCodesThunk } from 'store/slices/codesSlice';

import {
  CodesContainer,
  CodesTitle,
  GenerateForm,
  InputField,
  FormCard,
  Subtitle,
  MessageContainer,
} from '../styles/CodesStyles';

import LoadingButton from 'components/Button/LoadingButton';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';

const BulkGenerateCodesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.codes);

  // Quantidade de códigos a serem gerados
  const [quantity, setQuantity] = useState<number>(1);

  // Mensagem de erro local (por exemplo, quantidade < 1)
  const [localError, setLocalError] = useState<string | null>(null);

  // Estado local para simular loading de 1.5s
  const [isGenerating, setIsGenerating] = useState(false);

  // Exibe mensagem de sucesso com confetes
  const [showCelebration, setShowCelebration] = useState(false);

  // Lida com a geração em lote
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1) {
      setLocalError('Por favor, insira um valor maior ou igual a 1.');
      return;
    }
    setLocalError(null);
    setIsGenerating(true);

    // Simula 1.5s de carregamento local (delay do LoadingButton)
    setTimeout(async () => {
      // Chama a thunk de gerar em lote
      const resultAction = await dispatch(bulkGenerateCodesThunk({ quantity }));
      setIsGenerating(false);

      // Se a geração deu certo, mostra CelebrationMessage por 3s
      if (bulkGenerateCodesThunk.fulfilled.match(resultAction)) {
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
        }, 3000);
      }
    }, 1500);
  };

  return (
    <CodesContainer>
      {showCelebration && (
        <CelebrationMessage
          message="Códigos gerados com sucesso!"
          duration={3000}
        />
      )}

      <CodesTitle>Gerar Códigos em Lote</CodesTitle>
      <Subtitle>Escolha quantos códigos deseja gerar de uma só vez.</Subtitle>

      <FormCard>
        <GenerateForm onSubmit={handleGenerate}>
          <InputField
            type="number"
            min={1}
            value={quantity}
            disabled={isGenerating}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantidade"
          />

          <LoadingButton
            onClick={() => {}}
            loading={isGenerating}
            loadingDelay={0}
            disabled={isGenerating}
            style={{ padding: '0.5rem 1rem' }}
          >
            {isGenerating ? 'Gerando...' : 'Gerar'}
          </LoadingButton>
        </GenerateForm>

        {localError && (
          <MessageContainer style={{ backgroundColor: '#ffe6e6', color: '#cc0000' }}>
            {localError}
          </MessageContainer>
        )}
      </FormCard>

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
