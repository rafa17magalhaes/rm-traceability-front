import styled from 'styled-components';

// Contêiner principal do chat
export const ChatContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 60px;
  width: 320px;
  background: #f9f9f9; /* Fundo um pouco mais claro para contraste */
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 1000;
`;

// Cabeçalho do chat
export const ChatHeader = styled.div`
  background: #00509e; /* Azul escuro */
  color: #fff;
  padding: 0.75rem 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

// Título do chat
export const ChatTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

// Área onde aparecem as mensagens
export const ChatBody = styled.div`
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
`;

// Contêiner de cada linha de mensagem
export const ChatMessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.6rem;
`;

// Mensagem do usuário
export const ChatMessageUser = styled.div`
  background: #d0f0c0;
  color: #333;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  max-width: 70%;
  font-size: 0.9rem;
  line-height: 1.3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Mensagem do agente IA (mantemos a variável 'ChatMessageBot' para compatibilidade)
export const ChatMessageBot = styled.div`
  background: #e8eaf6;
  color: #333;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  max-width: 70%;
  font-size: 0.9rem;
  line-height: 1.3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Rodapé com input e botão
export const ChatFooter = styled.div`
  display: flex;
  padding: 0.6rem;
  background: #fafafa;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

// Campo de input
export const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #00509e;
    outline: none;
  }
`;

// Botão de enviar
export const ChatButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background: #00509e;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #003f7f;
  }
`;
