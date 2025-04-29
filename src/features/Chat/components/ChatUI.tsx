import React, { useState, useRef, useEffect, useContext } from 'react';
import { useAppDispatch } from 'store/hooks';
import { sendChatMessageThunk } from 'store/slices/chatSlice';
import { ChatMessage } from 'types/chat/ChatMessageDTO';
import { AuthContext } from 'context/AuthContext';

import {
  ChatArea,
  ChatUIContainer,
  MessagesContainer,
  ChatMessageContainer,
  ChatMessageUser,
  ChatMessageBot,
  TypingBubble,
  Dot,
  ThinkingStatusBar,
  ShiningText,
  ChatFooterContainer,
  ChatInput,
  ChatButton,
  InitialScreen,
  GreetingText,
  SuggestionContainer,
  SuggestionButton,
  ResponseTimeBadge,
  RouteLink,
} from '../styles/chatStyles';

const thinkingMessages = ['Pensando . . .', 'Aguarde . . .'];

// formata ms em s/min
const formatDuration = (ms: number): string => {
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

const SUGGESTIONS = [
  'Localizar inventário?',
  'Como gerar lote?',
  'Como realizar movimentação?'
];

const ROUTE_REGEX = /(\/[a-zA-Z0-9\-\/]+)/g;

// divide o texto em partes e substitui rotas por <RouteLink>
const renderWithRoutes = (text: string) => {
  const parts = text.split(ROUTE_REGEX);
  return parts.map((part, idx) =>
    ROUTE_REGEX.test(part) ? (
      <RouteLink key={idx} to={part}>
        {part}
      </RouteLink>
    ) : (
      part
    )
  );
};

const ChatUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext)!;
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const startRef = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isThinking]);

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([]);
    }
  }, [chatHistory.length]);

  useEffect(() => {
    if (!isThinking) return;
    const id = window.setInterval(() => {
      setThinkingIndex(i => (i + 1) % thinkingMessages.length);
    }, 10000); // 10s
    return () => window.clearInterval(id);
  }, [isThinking]);

  const send = async (text: string) => {
    setMessage('');
    setIsThinking(true);
    setChatHistory(h => [...h, { from: 'user', text }]);
    startRef.current = performance.now();

    const resp = await dispatch(sendChatMessageThunk({ message: text }));
    if (sendChatMessageThunk.fulfilled.match(resp)) {
      const { response } = resp.payload as { response: string };
      const delta = performance.now() - startRef.current;
      setChatHistory(h => [
        ...h,
        { from: 'agent', text: response, timeMs: delta }
      ]);
    }
    setIsThinking(false);
  };

  const handleSend = () => {
    if (message.trim()) send(message.trim());
  };

  const handleSuggestion = (s: string) => send(s);

  return (
    <ChatArea>
      <ChatUIContainer>
        {chatHistory.length === 0 ? (
          <InitialScreen>
            <GreetingText>
              Olá {user?.name.split(' ')[0]}!<br/>
              O que posso fazer por você?
            </GreetingText>
            <SuggestionContainer>
              {SUGGESTIONS.map(s => (
                <SuggestionButton
                  key={s}
                  onClick={() => handleSuggestion(s)}
                >
                  {s}
                </SuggestionButton>
              ))}
            </SuggestionContainer>
          </InitialScreen>
        ) : (
          <>
            <MessagesContainer>
              {chatHistory.map((msg, idx) => (
                <ChatMessageContainer
                  key={idx}
                  isUser={msg.from === 'user'}
                >
                  {msg.from === 'user' ? (
                    <ChatMessageUser>
                      <strong>Você:</strong> {msg.text}
                    </ChatMessageUser>
                  ) : (
                    <ChatMessageBot>
                      <strong>Agente IA:</strong>{' '}
                      {renderWithRoutes(msg.text)}
                      {'timeMs' in msg && (
                        <ResponseTimeBadge>
                          🕒 {formatDuration(msg.timeMs!)}
                        </ResponseTimeBadge>
                      )}
                    </ChatMessageBot>
                  )}
                </ChatMessageContainer>
              ))}

              {isThinking && (
                <ChatMessageContainer isUser={false}>
                  <ChatMessageBot>
                    <TypingBubble>
                      <Dot/><Dot/><Dot/>
                    </TypingBubble>
                  </ChatMessageBot>
                </ChatMessageContainer>
              )}

              <div ref={messagesEndRef}/>
            </MessagesContainer>

            {isThinking && (
              <ThinkingStatusBar>
                <ShiningText>
                  {thinkingMessages[thinkingIndex]}
                </ShiningText>
              </ThinkingStatusBar>
            )}
          </>
        )}

        <ChatFooterContainer>
          <ChatInput
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <ChatButton onClick={handleSend}>Enviar</ChatButton>
        </ChatFooterContainer>
      </ChatUIContainer>
    </ChatArea>
  );
};

export default ChatUI;
