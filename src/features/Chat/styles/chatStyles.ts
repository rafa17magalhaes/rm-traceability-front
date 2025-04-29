import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { BsStars } from 'react-icons/bs';

export const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto:wght@400;500&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

/* ─── Header Gradient Animation ────────────────────────── */
const headerGradient = keyframes`
  0%   { background-position:   0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
`;

/* ─── Icon “Spin-and-Pop” Animation ───────────────────── */
const iconAnim = keyframes`
  0%   { transform: rotate(0deg)   scale(1);   }
  10%  { transform: rotate(45deg)  scale(1.2); }
  30%  { transform: rotate(360deg) scale(1);   }
  100% { transform: rotate(360deg) scale(1);   }
`;

/* ─── Typing Dots Bounce ───────────────────────────────── */
const dotBounce = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;

/* ─── Page Container & Animated Header ────────────────── */
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
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  background: linear-gradient(
    270deg,
    rgb(22, 15, 77) 0%,
    #00509e 40%,
    #003a6f 80%,
    rgb(78, 66, 93) 100%
  );
  background-size: 300% 300%;
  animation: ${headerGradient} 8s ease infinite;

  color: #fff;
  font-family: 'Merriweather', serif;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const AnimatedIcon = styled(BsStars)`
  margin-right: 0.5rem;
  animation: ${iconAnim} 8s ease-in-out infinite;
`;

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

/* ─── Initial Greeting ─────────────────────────────────── */
export const InitialScreen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

export const GreetingText = styled.h1`
  font-family: 'Merriweather', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #222;
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
  background: #e8f2ff;
  border: none;
  border-radius: 24px;
  padding: 0.6rem 1.4rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #00509e;
  box-shadow: 0 2px 6px rgba(0, 80, 158, 0.15);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #cfe4ff;
    transform: translateY(-2px);
  }
`;

/* ─── Message Flow ────────────────────────────────────── */
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
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  white-space: normal;
  word-wrap: break-word;
`;

export const ChatMessageBot = styled.div`
  background: #f2f2f2;
  color: #333;
  padding: 0.8rem 1rem;
  border-radius: 16px;
  max-width: 70%;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  white-space: normal;
  word-wrap: break-word;
`;

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

export const ThinkingStatusBar = styled.div`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background: #fff;
  color: #444;
  text-align: left;
  margin-left: 2rem;
`;

export const ShiningText = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #aaa 20%, #fff 50%, #aaa 80%);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${headerGradient} 3s infinite linear;
`;

/* ─── Footer (Input + Button) ─────────────────────────── */
export const ChatFooterContainer = styled.div`
  background: #fff;
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
  font-family: 'Roboto', sans-serif;
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
  color: #fff;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #004280;
  }
`;

export const ResponseTimeBadge = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #555;
`;

/* ─── Clickable Route Link ─────────────────────────────── */
export const RouteLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, #0e69b0 0%, #00509e 100%);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0.2rem;
  text-decoration: none;
  transition:
    background 0.3s,
    transform 0.2s,
    box-shadow 0.2s;

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
