import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { bulkGenerateCodesThunk } from 'store/slices/codesSlice';

import {
  CodesContainer,
  CodesTitle,
  Subtitle,
  MessageContainer,
  CodesTable,
  CodesTh,
  CodesTd,
  ListCard,
} from '../styles/CodesStyles';

import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import BulkGenerateCodesForm from '../components/BulkGenerateCodesForm';
import { CodeDTO } from 'types/codes/CodeDTO';

const BulkGenerateCodesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.codes);

  const [prefix, setPrefix] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const [generatedCodes, setGeneratedCodes] = useState<CodeDTO[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Limita prefixo a 3 chars alfanuméricos
  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/[^a-zA-Z0-9]/g, '');
    if (val.length > 3) {
      val = val.slice(0, 3);
    }
    setPrefix(val);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  // Gera os códigos em lote
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) {
      setLocalError('Por favor, insira um valor maior ou igual a 1.');
      return;
    }
    setLocalError(null);
    setIsGenerating(true);

    // Simula 1.5s de "loading"
    setTimeout(async () => {
      const resultAction = await dispatch(
        bulkGenerateCodesThunk({ quantity, prefix })
      );
      setIsGenerating(false);

      if (bulkGenerateCodesThunk.fulfilled.match(resultAction)) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);

        const newCodes = resultAction.payload as CodeDTO[];
        setGeneratedCodes(newCodes);
        setCurrentPage(1);
      }
    }, 1500);
  };

  // Copiar para área de transferência
  const handleCopy = () => {
    const codesText = generatedCodes.map((c) => c.value).join('\n');
    navigator.clipboard.writeText(codesText).then(() => {
      alert('Códigos copiados para a área de transferência!');
    });
  };

  // Baixar CSV
  const handleDownloadCSV = () => {
    const csvContent = [
      ['ID', 'Código'],
      ...generatedCodes.map((c) => [c.id, c.value]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'codigos_gerados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(generatedCodes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCodes = generatedCodes.slice(startIndex, endIndex);

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

      {/* Formulário de geração */}
      <BulkGenerateCodesForm
        prefix={prefix}
        onPrefixChange={handlePrefixChange}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        isGenerating={isGenerating}
        localError={localError}
        handleGenerate={handleGenerate}
      />

      {/* Se houver erro global da store */}
      {error && (
        <MessageContainer style={{ backgroundColor: '#ffe6e6', color: '#cc0000' }}>
          Erro: {error}
        </MessageContainer>
      )}

      {/* Se houver códigos gerados, exibe listagem */}
      {generatedCodes.length > 0 && (
        <ListCard>
          <h3 style={{ marginBottom: '1rem' }}>Códigos Gerados</h3>

          <CodesTable>
            <thead>
              <tr>
                <CodesTh>Código</CodesTh>
              </tr>
            </thead>
            <tbody>
              {displayedCodes.map((c) => (
                <tr key={c.id}>
                  <CodesTd>{c.value}</CodesTd>
                </tr>
              ))}
            </tbody>
          </CodesTable>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleCopy}>Copiar</button>
            <button onClick={handleDownloadCSV}>Baixar CSV</button>
          </div>

          {/* Paginação */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </ListCard>
      )}

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Após gerar, você pode ir para a <strong>Listagem</strong> para ver todos os códigos.
      </p>
    </CodesContainer>
  );
};

export default BulkGenerateCodesPage;
