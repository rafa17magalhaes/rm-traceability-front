import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAllCodesThunk, changeCodeStatusThunk } from 'store/slices/codesSlice';
import { fetchActiveStatusesThunk } from 'store/slices/statusesSlice';
import { fetchAllResourcesThunk } from 'store/slices/resourcesSlice';

import { ChangeCodeStatusDTO } from 'types/events';

import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';
import CodeMovementForm from '../components/CodeMovementForm';
import { Container, Title } from '../styles/CodeMovementStyles';

const CodeMovementPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux state
  const { list: codesList, loading: codesLoading, error: codesError } = useAppSelector(
    (state) => state.codes
  );
  const { list: statusList, loading: statusLoading, error: statusError } = useAppSelector(
    (state) => state.statuses
  );
  const { list: resourcesList } = useAppSelector((state) => state.resources);

  // Carregando e erro global
  const isLoading = statusLoading || codesLoading;
  const globalError = statusError || codesError;

  const [showCelebration, setShowCelebration] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Busca os dados iniciais
  useEffect(() => {
    dispatch(fetchAllCodesThunk({ page: 1, size: 99999 }));
    dispatch(fetchActiveStatusesThunk());
    dispatch(fetchAllResourcesThunk());
  }, [dispatch]);

  // Captura a localização assim que a página carregar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error('Erro ao obter geolocalização:', error);
          setLocationError('Não foi possível obter sua localização. Por favor, permita o acesso ou tente novamente.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setLocationError('Geolocalização não é suportada por este navegador.');
    }
  }, []);

  const handleSuccess = () => {
    setShowCelebration(true);
    setProgress(0);
    setTotalCount(0);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const handleSubmitCodeStatus = async (
    addedCodes: any[],
    selectedStatus: string,
    observation: string,
    selectedResource?: string
  ) => {
    // Se não houver localização, não permite a movimentação
    if (!location) {
      return false;
    }
    setIsProcessing(true);
    setTotalCount(addedCodes.length);
    setProgress(0);

    console.time('TotalProcess');
    const promises = addedCodes.map((code) =>
      dispatch(
        changeCodeStatusThunk({
          id: code.id,
          dto: {
            statusId: selectedStatus,
            observation,
            resourceId: selectedResource,
            latitude: location.latitude,
            longitude: location.longitude,
          } as ChangeCodeStatusDTO,
        })
      ).then((result) => {
        setProgress((prev) => prev + 1);
        return result;
      })
    );

    const results = await Promise.all(promises);
    console.timeEnd('TotalProcess');
    setIsProcessing(false);
    return results.every((res) => changeCodeStatusThunk.fulfilled.match(res));
  };

  return (
    <Container>
      {showCelebration && (
        <CelebrationMessage message="Movimentação registrada com sucesso!" duration={3000} />
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
