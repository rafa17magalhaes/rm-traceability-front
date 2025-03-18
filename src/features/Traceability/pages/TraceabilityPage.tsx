import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllEventsThunk } from 'store/slices/eventsSlice';
import { EventDTO } from 'types/events/EventDTO';
import { ResourceDTO } from 'types/resources';
import TraceabilitySearchForm from '../components/TraceabilitySearchForm';
import TraceabilityMap from '../components/TraceabilityMap';
import { 
  PageContainer, 
  ContentWrapper, 
  SidebarWrapper, 
  EventsList, 
  EventItem 
} from '../styles';

import { useSearchParams } from 'react-router-dom';

const TraceabilityPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.events);

  const [mapEvents, setMapEvents] = useState<EventDTO[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDTO | null>(null);
  const [searchResource, setSearchResource] = useState<ResourceDTO | null>(null);
  const [searchParams] = useSearchParams();

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const query = {
      page: 1,
      size: 9999,
      search: `valueCode:${searchTerm}`,
    };

    const actionResult = await dispatch(fetchAllEventsThunk(query));
    if (fetchAllEventsThunk.fulfilled.match(actionResult)) {
      const eventsData = actionResult.payload.data as EventDTO[];
      setMapEvents(eventsData);
      setSelectedEvent(null);

      if (
        eventsData.length > 0 &&
        eventsData[0].code &&
        eventsData[0].code.resource
      ) {
        setSearchResource(eventsData[0].code.resource);
      } else {
        setSearchResource(null);
      }
    }
  };

  const handleSelectEvent = (evt: EventDTO) => {
    setSelectedEvent(evt);
  };

  // Se tiver "?code=XYZ" na URL, faz a busca automaticamente
  useEffect(() => {
    const codeFromURL = searchParams.get('code');
    if (codeFromURL) {
      handleSearch(codeFromURL);
    }
  }, [searchParams]);

  return (
    <PageContainer>
      <h2 className="pageTitle">Mapa Interativo de Rastreio</h2>

      <TraceabilitySearchForm
        onSearch={handleSearch}
        loading={loading}
        error={error}
        resource={searchResource}
      />

      <ContentWrapper>
        <SidebarWrapper>
          <h3>Últimas Movimentações</h3>
          <EventsList>
            {mapEvents.map((evt) => (
              <EventItem
                key={evt.id}
                onClick={() => handleSelectEvent(evt)}
                className={selectedEvent?.id === evt.id ? 'selected' : ''}
              >
                <strong>{evt.valueCode}</strong>
                <span>
                  {evt.createdAt
                    ? new Date(evt.createdAt).toLocaleString()
                    : 'N/A'}
                </span>
                <span>{evt.observation || 'Sem observação'}</span>
              </EventItem>
            ))}
            {mapEvents.length === 0 && (
              <p style={{ margin: '0.5rem', color: '#666' }}>
                Nenhuma movimentação encontrada.
              </p>
            )}
          </EventsList>
        </SidebarWrapper>

        <TraceabilityMap 
          events={mapEvents} 
          selectedEvent={selectedEvent} 
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default TraceabilityPage;
