import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  fetchAllCodesThunk,
  changeCodeStatusThunk,
} from 'store/slices/codesSlice';
import { fetchActiveStatusesThunk } from 'store/slices/statusesSlice';
import { fetchAllResourcesThunk } from 'store/slices/resourcesSlice';
import { fetchUnreadCountThunk } from 'store/slices/notificationsSlice';
import { ChangeCodeStatusDTO } from 'types/events';
import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import CodeMovementForm from '../components/CodeMovementForm';
import { Container, Title } from '../styles/CodeMovementStyles';

const CodeMovementPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list: codesList, loading: codesLoading, error: codesError } =
    useAppSelector((s) => s.codes);
  const { list: statusList, loading: statusLoading, error: statusError } =
    useAppSelector((s) => s.statuses);
  const { list: resourcesList } = useAppSelector((s) => s.resources);

  const isLoading = statusLoading || codesLoading;
  const globalError = statusError || codesError;

  const [showCelebration, setShowCelebration] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllCodesThunk({ page: 1, size: 99999 }));
    dispatch(fetchActiveStatusesThunk());
    dispatch(fetchAllResourcesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocalização não é suportada por este navegador.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocationError(null);
      },
      () => {
        setLocationError(
          'Não foi possível obter sua localização. Por favor, permita o acesso ou tente novamente.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const handleSuccess = () => {
    setShowCelebration(true);
    setProgress(0);
    setTotalCount(0);
    dispatch(fetchUnreadCountThunk());
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const handleSubmitCodeStatus = async (
    addedCodes: any[],
    selectedStatus: string,
    observation: string,
    selectedResource?: string
  ) => {
    if (!location) return false;

    setIsProcessing(true);
    setTotalCount(addedCodes.length);
    setProgress(0);

    const results = await Promise.all(
      addedCodes.map((c) =>
        dispatch(
          changeCodeStatusThunk({
            id: c.id,
            dto: {
              statusId: selectedStatus,
              observation,
              resourceId: selectedResource,
              latitude: location.latitude,
              longitude: location.longitude,
            } as ChangeCodeStatusDTO,
          })
        ).then((r) => {
          setProgress((p) => p + 1);
          return r;
        })
      )
    );

    setIsProcessing(false);
    return results.every((r) => changeCodeStatusThunk.fulfilled.match(r));
  };

  return (
    <Container>
      {showCelebration && (
        <CelebrationMessage
          message="Movimentação registrada com sucesso!"
          duration={3000}
        />
      )}
      <Title>Movimentar Código</Title>

      {progress > 0 && progress < totalCount && (
        <div style={{ marginBottom: '1rem', textAlign: 'center', color: '#555' }}>
          Processando {progress} de {totalCount}...
        </div>
      )}

      {locationError && (
        <div style={{ marginBottom: '1rem', textAlign: 'center', color: 'red' }}>
          {locationError}
        </div>
      )}

      <CodeMovementForm
        codesList={codesList}
        statusList={statusList}
        resourcesList={resourcesList}
        isLoading={isLoading}
        processing={isProcessing}
        globalError={globalError}
        onSubmitCodeStatus={handleSubmitCodeStatus}
        onSuccess={handleSuccess}
      />
    </Container>
  );
};

export default CodeMovementPage;
