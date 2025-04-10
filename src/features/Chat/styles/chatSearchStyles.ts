import styled from 'styled-components';

interface ContainerProps {
  expanded: boolean;
}

export const ChatSearchContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.3rem;
  width: ${(props) => (props.expanded ? '420px' : '320px')};
  transition: width 0.3s ease;
`;

export const IconContainer = styled.div`
  font-size: 1.3rem;
  color: #777;
  display: flex;
  align-items: center;
`;

export const ChatSearchWrapper = styled.div<{ expanded: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #999;
  }
  &:focus-within {
    border-color: #00509e;
  }
`;

export const ChatSearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.9rem;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

export const ChatSearchBody = styled.div`
  position: absolute;
  top: 3.1rem;
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

/* Bolhas de mensagem */
export const ChatMessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
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
