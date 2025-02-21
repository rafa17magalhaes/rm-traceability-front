import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks'; 
import { fetchAllCodesThunk } from 'store/slices/codesSlice';
import {
  CodesContainer,
  CodesTitle,
  CodesTable,
  CodesTh,
  CodesTd,
  NoDataText,
  ModalBackdrop,
  ModalImage
} from '../styles/CodesStyles';

const CodesListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.codes);

  // Estado para armazenar a URL do QR code selecionado (para exibir em tamanho maior)
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllCodesThunk());
  }, [dispatch]);

  return (
    <CodesContainer>
      <CodesTitle>Listagem de Códigos</CodesTitle>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      <CodesTable>
        <thead>
          <tr>
            <CodesTh>Valor do Código</CodesTh>
            <CodesTh>Produto</CodesTh>
            <CodesTh>Status</CodesTh>
            <CodesTh>QR Code</CodesTh>
          </tr>
        </thead>
        <tbody>
          {list.map((code) => (
            <tr key={code.id}>
            <CodesTd>{code.value}</CodesTd>
              <CodesTd>
                {code.resource?.name ? (
                  code.resource.name
                ) : (
                  <NoDataText>Produto não informado</NoDataText>
                )}
              </CodesTd>
              <CodesTd>
                {code.status && code.status.name ? (
                  code.status.name
                ) : (
                  <NoDataText>Status não informado</NoDataText>
                )}
              </CodesTd>

              <CodesTd>
                {code.qrCodeUrl ? (
                  <img
                    src={code.qrCodeUrl}
                    alt="QR"
                    style={{ width: 80, height: 80, cursor: 'pointer' }}
                    onClick={() => setSelectedQRCode(code.qrCodeUrl ?? null)}
                  />
                ) : (
                  <NoDataText>Sem QR Code</NoDataText>
                )}
              </CodesTd>
            </tr>
          ))}
        </tbody>
      </CodesTable>

      {selectedQRCode && (
        <ModalBackdrop onClick={() => setSelectedQRCode(null)}>
          <ModalImage
            src={selectedQRCode}
            alt="QR Ampliado"
          />
        </ModalBackdrop>
      )}
    </CodesContainer>
  );
};

export default CodesListPage;
