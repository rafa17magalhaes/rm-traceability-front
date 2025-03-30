import React from 'react';

import LoadingButton from 'components/Button/LoadingButton';
import {
  FormCard,
  GenerateForm,
  InputField,
  MessageContainer,
} from '../styles/CodesStyles';

interface BulkGenerateCodesFormProps {
  prefix: string;
  onPrefixChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isGenerating: boolean;
  localError: string | null;
  handleGenerate: (e: React.FormEvent) => void;
}

const BulkGenerateCodesForm: React.FC<BulkGenerateCodesFormProps> = ({
  prefix,
  onPrefixChange,
  quantity,
  onQuantityChange,
  isGenerating,
  localError,
  handleGenerate,
}) => {
  return (
    <FormCard>
      <GenerateForm onSubmit={handleGenerate}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: 'bold' }}>Prefixo (opcional)</label>
          <InputField
            type="text"
            value={prefix}
            onChange={onPrefixChange}
            placeholder="Ex: GAR"
            disabled={isGenerating}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: 'bold' }}>Quantidade</label>
          <InputField
            type="number"
            min={1}
            value={quantity}
            onChange={onQuantityChange}
            placeholder="Quantidade"
            disabled={isGenerating}
          />
        </div>

        <LoadingButton
          type="submit"
          loading={isGenerating}
          loadingDelay={0}
          disabled={isGenerating}
          style={{ padding: '0.5rem 1rem', marginTop: '1.5rem' }}
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
  );
};

export default BulkGenerateCodesForm;
