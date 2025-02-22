import GenericList, { ColumnDefinition } from 'components/List/GenericList';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllCodesThunk } from 'store/slices/codesSlice';
import { CodeDTO } from 'types/codes';

const CodesListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.codes);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllCodesThunk());
  }, [dispatch]);

  // Definição das colunas para a listagem de códigos
  const columns: ColumnDefinition<CodeDTO>[] = [
    {
      header: 'Valor do Código',
      render: (code) => code.value,
    },
    {
      header: 'Produto',
      render: (code) =>
        code.resource?.name ? code.resource.name : <span style={{ fontStyle: 'italic', color: '#999' }}>Produto não informado</span>,
    },
    {
      header: 'Status',
      render: (code) =>
        code.status && code.status.name ? code.status.name : <span style={{ fontStyle: 'italic', color: '#999' }}>Status não informado</span>,
    },
    {
      header: 'QR Code',
      render: (code) =>
        code.qrCodeUrl ? (
          <img
            src={code.qrCodeUrl}
            alt="QR"
            style={{ width: 80, height: 80, cursor: 'pointer' }}
            onClick={() => setSelectedQRCode(code.qrCodeUrl ?? null)}
          />
        ) : (
          <span style={{ fontStyle: 'italic', color: '#999' }}>Sem QR Code</span>
        ),
    },
  ];

  return (
    <>
      <GenericList title="Listagem de Códigos" data={list} columns={columns} loading={loading} error={error || undefined}
 />
      {selectedQRCode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out',
          }}
          onClick={() => setSelectedQRCode(null)}
        >
          <img src={selectedQRCode} alt="QR Ampliado" style={{ width: 400, height: 400, backgroundColor: '#fff', padding: 10, borderRadius: 8 }} />
        </div>
      )}
    </>
  );
};

export default CodesListPage;
