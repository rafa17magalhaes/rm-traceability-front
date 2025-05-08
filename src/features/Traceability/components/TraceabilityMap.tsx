import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { EventDTO } from 'types/events/EventDTO';

import { MapWrapper } from '../styles';

// Configuração dos ícones do Leaflet para bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapControllerProps {
  onMapReady: (map: L.Map) => void;
}

const MapController: React.FC<MapControllerProps> = ({ onMapReady }) => {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
};

interface TraceabilityMapProps {
  events: EventDTO[];
  selectedEvent?: EventDTO | null;
}

const TraceabilityMap: React.FC<TraceabilityMapProps> = ({ events, selectedEvent }) => {
  // Posição padrão do mapa (centro do Brasil)
  const defaultPosition: [number, number] = [-14.2350, -51.9253];
  const zoomLevel = 4;

  // Ref para armazenar a instância do mapa
  const mapRef = useRef<L.Map | null>(null);

  // Se houver pelo menos um evento com coordenadas, usamos a posição do primeiro
  const firstEventWithCoords = events.find((e) => e.latitude && e.longitude);
  const centerPosition: [number, number] = firstEventWithCoords
    ? [firstEventWithCoords.latitude!, firstEventWithCoords.longitude!]
    : defaultPosition;

  // Quando selectedEvent mudar, centraliza o mapa nesse local
  useEffect(() => {
    if (selectedEvent && selectedEvent.latitude && selectedEvent.longitude && mapRef.current) {
      mapRef.current.flyTo([selectedEvent.latitude, selectedEvent.longitude], 13, {
        animate: true,
      });
    }
  }, [selectedEvent]);

  return (
    <MapWrapper>
      <MapContainer center={centerPosition} zoom={zoomLevel} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController onMapReady={(mapInstance) => { mapRef.current = mapInstance; }} />
        {events
          .filter((e) => e.latitude && e.longitude)
          .map((evt) => (
            <Marker key={evt.id} position={[evt.latitude!, evt.longitude!]}>
              <Popup>
                <div>
                  <strong>QR Code:</strong> {evt.valueCode} <br />
                  <strong>Data:</strong>{' '}
                  {evt.createdAt ? new Date(evt.createdAt).toLocaleString() : 'N/A'} <br />
                  <strong>Observação:</strong> {evt.observation || 'N/A'} <br />
                  {evt.code && evt.code.resource && (
                  <>
                    <strong>Produto:</strong> {evt.code.resource.name} <br />
                    {evt.code.resource.imageUrl && (
                      <img
                        src={evt.code.resource.imageUrl}
                        alt={evt.code.resource.name}
                        style={{ width: '100%', maxWidth: '150px', marginTop: '0.5rem' }}
                      />
                    )}
                  </>
                )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default TraceabilityMap;
