import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% {
    background-position: -200%;
  }
  60% {
    background-position: 200%;
  }
  100% {
    background-position: 200%;
  }
`;

export const ChatHeader = styled.div`
  background: linear-gradient(90deg, #00509e 0%, #0e69b0 100%);
  color: #fff;
  padding: 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  align-items: center;
`;

export const AiPageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  /* Se não quiser que o body tenha rolagem, remova overflow-y ou defina-o como hidden */
  overflow: hidden;
  background-color: #f3f3f3;
`;

export const ChatArea = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 80vh; /* Altura fixa */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden; /* Impede que o ChatArea expanda */
`;

export const ChatUIContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* Rolagem interna para mensagens */
  padding: 1.5rem 2rem;
  padding-bottom: 5rem;
`;

export const ChatFooterContainer = styled.div`
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 0.85rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00509e;
    box-shadow: 0 0 5px rgba(0, 80, 158, 0.3);
  }
`;

export const ChatButton = styled.button`
  padding: 0.85rem 1.5rem;
  border-radius: 20px;
  background-color: #00509e;
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004280;
  }
`;

export const ChatMessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin: 1rem 0;
`;

export const ChatMessageUser = styled.div`
  background: #00509e;
  color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 16px;
  max-width: 60%;
  font-size: 1rem;
  line-height: 1.5;
  transition: 0.3s all ease-in-out;
`;

export const ChatMessageBot = styled.div`
  background-color: #f2f2f2;
  color: #333;
  padding: 0.8rem 1.2rem;
  border-radius: 16px;
  max-width: 60%;
  font-size: 1rem;
  line-height: 1.5;
  transition: 0.3s all ease-in-out;
`;

export const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 0.8rem;
`;

export const ShiningText = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #aaa 20%, #fff 50%, #aaa 80%);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shine} 2s infinite linear;
`;

export const ThinkingStatusBar = styled.div`
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: #fff;
  text-align: left;
  color: #444;
`;

const dotBounce = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;

export const TypingBubble = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  gap: 6px;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #777;
  border-radius: 50%;
  animation: ${dotBounce} 1s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
