import styled from 'styled-components';

interface ContainerProps {
  expanded: boolean;
}

export const ChatSearchContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.expanded ? '400px' : '220px')};
  transition: width 0.3s ease;
  margin-left: 1rem;
`;

export const ChatSearchWrapper = styled.div`
  position: relative;
  /* Isso permite colocar o dropdown (histórico) abaixo do wrapper */
`;

export const ChatSearchBar = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  background-color: #fafafa; /* Fundo suave */
  border: 2px solid #ccc; /* Borda mais espessa */
  border-radius: 24px; /* Cantos arredondados, estilo "pill" */
  padding: 0.4rem 0.8rem; /* Espaçamento vertical/horizontal */
  transition: all 0.25s ease;
  width: ${(props) => (props.expanded ? '420px' : '260px')};
  box-shadow: ${(props) =>
    props.expanded ? '0 2px 6px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    /* Um leve hover para realçar que é clicável */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    border-color: #bbb; /* Escurece a borda ao passar o mouse */
  }
`;

export const ChatIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.1rem;
  color: #777;
`;

export const ChatSearchInput = styled.input`
  flex: 1; /* Ocupa todo o espaço restante */
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
  color: #333;

  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

/* Corpo (dropdown) que exibe o histórico */
export const ChatSearchBody = styled.div`
  position: absolute;
  top: 3.1rem; /* Ajuste para alinhar abaixo da barra, dependendo da altura do ChatSearchBar */
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 0.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 260px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

export const ChatSearchMessagesWrapper = styled.div`
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
`;

/* Cada "bolha" de mensagem */
export const ChatMessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.5rem;
`;

export const ChatMessageUser = styled.div`
  background: #d0f0c0;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  max-width: 70%;
  margin-top: 0.2rem;
  font-size: 0.9rem;
  color: #333;
`;

export const ChatMessageBot = styled.div`
  background: #e8eaf6;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  max-width: 70%;
  margin-top: 0.2rem;
  font-size: 0.9rem;
  color: #333;
`;
