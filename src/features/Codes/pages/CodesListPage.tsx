import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllCodesThunk } from 'store/slices/codesSlice';

import { CodeDTO } from 'types/codes/CodeDTO';
import { QueryParamsDTO } from 'types/pagination';

import GenericList, { ColumnDefinition } from 'components/List/GenericList';

const CodesListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, total, page, size } = useAppSelector((state) => state.codes);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);

  const loadCodes = (pageNumber: number) => {
    const query: QueryParamsDTO = {
      page: pageNumber,
      size: 20,
      search: '',
      sort: '',
    };
    dispatch(fetchAllCodesThunk(query) as any);
  };

  useEffect(() => {
    loadCodes(1);
  }, [dispatch]);

  const columns: ColumnDefinition<CodeDTO>[] = [
    {
      header: 'Valor do Código',
      render: (code) => code.value,
    },
    {
      header: 'Produto',
      render: (code) =>
        code.resource?.name ? (
          code.resource.name
        ) : (
          <span style={{ fontStyle: 'italic', color: '#999' }}>Produto não informado</span>
        ),
    },
    {
      header: 'Status',
      render: (code) =>
        code.status && code.status.name ? (
          code.status.name
        ) : (
          <span style={{ fontStyle: 'italic', color: '#999' }}>Status não informado</span>
        ),
    },
    {
      header: 'Data de Criação',
      render: (code) =>
        code.createdAt
          ? new Date(code.createdAt).toLocaleString('pt-BR')
          : 'Sem data',
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

  const totalPages = Math.ceil(total / (size || 20));

  return (
    <>
      <GenericList
        title="Listagem de Códigos"
        data={list}
        columns={columns}
        loading={loading}
        error={error || undefined}
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        onPageChange={(newPage) => loadCodes(newPage)}
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
          <img
            src={selectedQRCode}
            alt="QR Ampliado"
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 8,
            }}
          />
        </div>
      )}
    </>
  );
};

export default CodesListPage;
