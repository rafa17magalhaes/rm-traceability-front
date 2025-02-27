import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store'; // Ajuste para o path do seu store
import { fetchAllEventsThunk } from 'store/slices/eventsSlice';
import { EventDTO } from 'types/events';
import GenericList, { ColumnDefinition } from 'components/List/GenericList';

const EventsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { list: events, loading, error } = useSelector((state: RootState) => state.events);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllEventsThunk() as any);
  }, [dispatch]);

  // Ordena os eventos de forma decrescente (do mais recente para o mais antigo)
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [events]);

  // Definição das colunas para a listagem de eventos
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
      render: (event) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {event.resource?.imageUrl ? (
            <img
              src={event.resource.imageUrl}
              alt="Imagem do Produto"
              style={{ width: 80, height: 80, objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontStyle: 'italic', color: '#999' }}>Sem imagem</span>
          )}
          <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>
            {event.resource?.name ? event.resource.name : 'Produto não informado'}
          </span>
        </div>
      ),
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

  return (
    <>
      <GenericList
        title="Ultimas Movimentações"
        data={sortedEvents}
        columns={columns}
        loading={loading}
        error={error ?? undefined}
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
