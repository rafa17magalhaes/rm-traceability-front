import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/* ─── Animações ───────────────────────────────────────── */

const shine = keyframes`
  0%   { background-position: -200%; }
  60%  { background-position: 200%; }
  100% { background-position: 200%; }
`;

const dotBounce = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;

/* ─── Container Externo e Header ──────────────────────── */

export const AiPageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f3f3f3;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  background: linear-gradient(90deg, #00509e 0%, #0e69b0 100%);
  color: #ffffff;
  padding: 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  align-items: center;
`;

/* ─── Área do Chat ───────────────────────────────────── */

export const ChatArea = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

export const ChatUIContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

/* ─── Tela Inicial ────────────────────────────────────── */

export const InitialScreen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

export const GreetingText = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #222222;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 1.5rem;
`;

export const SuggestionContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SuggestionButton = styled.button`
  background: #f0f8ff;
  border: none;
  border-radius: 24px;
  padding: 0.6rem 1.4rem;
  font-size: 0.95rem;
  color: #00509e;
  box-shadow: 0 2px 6px rgba(0, 80, 158, 0.15);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
  &:hover {
    background: #dbeeff;
    transform: translateY(-2px);
  }
`;

/* ─── Fluxo de Mensagens ───────────────────────────────── */

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;
  padding-bottom: 5rem;
  min-height: 0;
`;

export const ChatMessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin: 1rem 0;
`;

export const ChatMessageUser = styled.div`
  background: #00509e;
  color: #fff;
  padding: 0.8rem 1rem;
  border-radius: 16px;
  max-width: 70%;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 0.5rem;
`;

export const ChatMessageBot = styled.div`
  background: #f2f2f2;
  color: #333;
  padding: 0.8rem 1rem;
  border-radius: 16px;
  max-width: 70%;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 0.5rem;
`;

/* ─── Indicador de Digitação ───────────────────────────── */

export const TypingBubble = styled.div`
  display: inline-flex;
  align-items: center;
  background: #fafafa;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  gap: 6px;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #777777;
  border-radius: 50%;
  animation: ${dotBounce} 1s infinite ease-in-out;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

/* ─── Barra “Pensando...” ──────────────────────────────── */

export const ThinkingStatusBar = styled.div`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background: #ffffff;
  color: #444444;
  text-align: left;
  margin-left: 2rem;
`;

export const ShiningText = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #aaaaaa 20%, #ffffff 50%, #aaaaaa 80%);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shine} 3s infinite linear;
`;

/* ─── Footer (input + botão) ───────────────────────────── */

export const ChatFooterContainer = styled.div`
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 0.85rem 1rem;
  border-radius: 20px;
  border: 1px solid #cccccc;
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
  background: #00509e;
  color: #ffffff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #004280;
  }
`;

/* ─── Badge de Tempo de Resposta ───────────────────────── */

export const ResponseTimeBadge = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #555555;
`;

/* ─── Link de Rota clicável ───────────────────────────── */

export const RouteLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, #0e69b0 0%, #00509e 100%);
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  margin: 0 0.2rem;
  transition:
    background 0.3s,
    transform 0.2s,
    box-shadow 0.2s;

  /* seta discreta após o texto */
  &:after {
    content: ' ↗';
    font-size: 0.8em;
    transition: margin-left 0.2s;
  }

  &:hover {
    background: linear-gradient(90deg, #00509e 0%, #003a6f 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 80, 158, 0.2);
  }
  &:hover:after {
    margin-left: 4px;
  }
`;
