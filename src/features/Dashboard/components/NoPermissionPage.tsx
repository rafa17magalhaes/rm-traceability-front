import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Title, Message, ActionsContainer, BackButton } from '../styles/NoPermissionPageStyles';

const NoPermissionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard'); // redireciona para a home do dashboard
  };

  return (
    <Container>
      <Title>Acesso Negado</Title>
      <Message>Você não tem permissão para acessar este módulo.<br />
        Caso ache que isso é um equívoco, entre em contato com o administrador.
      </Message>

      <ActionsContainer>
        <BackButton onClick={handleGoHome}>
          Voltar ao Menu
        </BackButton>
      </ActionsContainer>
    </Container>
  );
};

export default NoPermissionPage;
