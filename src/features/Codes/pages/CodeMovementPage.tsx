import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  fetchAllCodesThunk,
  changeCodeStatusThunk,
} from 'store/slices/codesSlice';
import { fetchActiveStatusesThunk } from 'store/slices/statusesSlice';
import { fetchAllResourcesThunk } from 'store/slices/resourcesSlice';

import CelebrationMessage from 'components/CelebrationMessage/CelebrationMessage';

import { Container, Title } from '../styles/CodeMovementStyles';
import CodeMovementForm from '../components/CodeMovementForm';

const CodeMovementPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux state
  const { list: codesList, loading: codesLoading, error: codesError } = useAppSelector((state) => state.codes);
  const { list: statusList, loading: statusLoading, error: statusError } = useAppSelector((state) => state.statuses);
  const { list: resourcesList } = useAppSelector((state) => state.resources);

  // Carregando e erro global
  const isLoading = statusLoading || codesLoading;
  const globalError = statusError || codesError;

  // Para exibir a mensagem de sucesso (confetes, etc.)
  const [showCelebration, setShowCelebration] = useState(false);

  // Busca os dados iniciais
  useEffect(() => {
    dispatch(fetchAllCodesThunk({ page: 1, size: 99999 }));
    dispatch(fetchActiveStatusesThunk());
    dispatch(fetchAllResourcesThunk());
  }, [dispatch]);

  // Callback que mostra confete de sucesso
  const handleSuccess = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  // Função faz o dispatch do "changeCodeStatusThunk"
  const handleSubmitCodeStatus = async (
    addedCodes: any[],
    selectedStatus: string,
    observation: string,
    selectedResource?: string
  ) => {
    const promises = addedCodes.map((code) =>
      dispatch(
        changeCodeStatusThunk({
          id: code.id,
          dto: {
            statusId: selectedStatus,
            observation,
            resourceId: selectedResource,
          },
        })
      )
    );

    const results = await Promise.all(promises);

    // Retorna true se todos foram fulfilled
    return results.every((res) => changeCodeStatusThunk.fulfilled.match(res));
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

      {/* Componente de Form */}
      <CodeMovementForm
        codesList={codesList}
        statusList={statusList}
        resourcesList={resourcesList}
        isLoading={isLoading}
        globalError={globalError}
        onSubmitCodeStatus={handleSubmitCodeStatus}
        onSuccess={handleSuccess}
      />
    </Container>
  );
};

export default CodeMovementPage;
