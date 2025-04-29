import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { BsStars } from 'react-icons/bs';

interface ContainerProps {
  expanded: boolean;
}

/* ─── Ícone “Spin-and-Pop” Animation ─────────────────── */
const iconAnim = keyframes`
  0%   { transform: rotate(0deg)   scale(1);   }
  10%  { transform: rotate(45deg)  scale(1.2); }
  30%  { transform: rotate(360deg) scale(1);   }
  100% { transform: rotate(360deg) scale(1);   }
`;

/* ─── Digitação (“…”) ──────────────────────────────────── */
const dotBounce = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;

/* ─── Brilho no “pensando” ───────────────────────────── */
const shine = keyframes`
  0%   { background-position: -200%; }
  60%  { background-position: 200%; }
  100% { background-position: 200%; }
`;

/* ─── Componente de Ícone Animado ────────────────────── */
export const AnimatedIcon = styled(BsStars)`
  font-size: 1.3rem;
  color: #777;
  animation: ${iconAnim} 8s ease-in-out infinite;
`;

/* ─── Container Principal ───────────────────────────────── */
export const ChatSearchContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.3rem;
  width: ${(p) => (p.expanded ? '500px' : '320px')};
  transition: width 0.3s ease;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

/* ─── Wrapper e Input ──────────────────────────────────── */
export const ChatSearchWrapper = styled.div<{ expanded: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  transition: border-color 0.2s;
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

/* ─── Dropdown Body ───────────────────────────────────── */
export const ChatSearchBody = styled.div`
  position: absolute;
  top: 3.1rem;
  left: 0;
  width: inherit;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 350px;
  display: flex;
  flex-direction: column;
  z-index: 999;
  min-height: 0;
`;

export const ChatSearchMessagesWrapper = styled.div`
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  min-height: 0;
`;

/* ─── Mensagens ───────────────────────────────────────── */
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
  font-size: 0.9rem;
  color: #333;
  max-width: 70%;
  white-space: pre-line;
  word-break: break-word;
  text-align: left;
  line-height: 1.4;
`;

export const ChatMessageBot = styled.div`
  background: #e8eaf6;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #333;
  max-width: 70%;
  white-space: pre-line;
  word-break: break-word;
  text-align: left;
  line-height: 1.4;
`;

/* ─── Digitação (“…”) ──────────────────────────────────── */
export const TypingBubble = styled.div`
  display: inline-flex;
  align-items: center;
  background: #e8eaf6;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  gap: 6px;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #777;
  border-radius: 50%;
  animation: ${dotBounce} 1s infinite ease-in-out;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

/* ─── Barra “Pensando” ─────────────────────────────────── */
export const ThinkingStatusBar = styled.div`
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  background: #fff;
  color: #444;
  text-align: left;
  margin-left: 1rem;
`;

/* ─── Texto Brilhante ─────────────────────────────────── */
export const ShiningText = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #aaa 20%, #fff 50%, #aaa 80%);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shine} 3s infinite linear;
`;

/* ─── Saudação Inicial ─────────────────────────────────── */
export const GreetingContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

export const GreetingText = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const SuggestionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SuggestionButton = styled.button`
  background: #f0f8ff;
  border: none;
  border-radius: 16px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: #00509e;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #dbeeff;
  }
`;

/* ─── Badge de Tempo ───────────────────────────────────── */
export const ResponseTimeBadge = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #555;
`;

/* ─── Link de Rota Clicável ─────────────────────────────── */
export const RouteLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, #0e69b0 0%, #00509e 100%);
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  margin: 0.1rem;
  transition:
    background 0.3s,
    transform 0.2s;
  &:after {
    content: ' ↗';
    font-size: 0.8em;
    transition: margin-left 0.2s;
  }
  &:hover {
    background: linear-gradient(90deg, #00509e 0%, #003a6f 100%);
    transform: translateY(-1px);
  }
  &:hover:after {
    margin-left: 4px;
  }
`;
