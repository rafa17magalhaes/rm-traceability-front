import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchAllEventsThunk } from 'store/slices/eventsSlice';
import { EventDTO } from 'types/events';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';

const EventsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading, error, total, page, size } = useSelector((state: RootState) => state.events);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);

  const loadEvents = (pageNumber: number) => {
    dispatch(fetchAllEventsThunk({ page: pageNumber, size: 20 }) as any);
  };

  useEffect(() => {
    loadEvents(1);
  }, [dispatch]);

  const columns: ColumnDefinition<EventDTO>[] = [
    {
      header: 'QR Code',
      render: (event) =>
        event.code?.qrCodeUrl ? (
          <img
            src={event.code.qrCodeUrl}
            alt="QR Code"
            style={{ width: 80, height: 80, cursor: 'pointer' }}
            onClick={() => setSelectedQRCode(event.code.qrCodeUrl ?? null)}
          />
        ) : (
          <span style={{ fontStyle: 'italic', color: '#999' }}>Sem QR Code</span>
        ),
    },
    {
      header: 'Produto',
      render: (event) => {
        // Prioriza os dados do recurso vindos do código
        const productResource = event.code?.resource || event.resource;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {productResource?.imageUrl ? (
              <img
                src={productResource.imageUrl}
                alt="Imagem do Produto"
                style={{ width: 80, height: 80, objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontStyle: 'italic', color: '#999' }}>Sem imagem</span>
            )}
            <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>
              {productResource?.name ? productResource.name : 'Produto não informado'}
            </span>
          </div>
        );
      },
    },
    
    {
      header: 'Valor Código',
      render: (event) => event.valueCode,
    },
    {
      header: 'Status',
      render: (event) => event.status?.name || event.statusId,
    },
    {
      header: 'Usuário',
      render: (event) => event.user?.name || 'Desconhecido',
    },
    {
      header: 'Data da movimentação',
      render: (event) =>
        event.createdAt
          ? new Date(event.createdAt).toLocaleString('pt-BR')
          : 'Sem data',
    },
  ];

  const safeSize = size || 20;
  const totalPages = Math.ceil(total / safeSize);

  return (
    <>
      <GenericList
        title="Últimas Movimentações"
        data={list}
        columns={columns}
        loading={loading}
        error={error ?? undefined}
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        onPageChange={(newPage) => loadEvents(newPage)}
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

export default EventsListPage;
