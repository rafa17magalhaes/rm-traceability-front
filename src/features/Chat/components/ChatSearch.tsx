import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAppDispatch } from 'store/hooks';
import { sendChatMessageThunk } from 'store/slices/chatSlice';
import { AuthContext } from 'context/AuthContext';

import {
  ChatSearchContainer,
  IconContainer,
  ChatSearchWrapper,
  ChatSearchInput,
  ChatSearchBody,
  ChatSearchMessagesWrapper,
  ChatMessageContainer,
  ChatMessageUser,
  ChatMessageBot,
  TypingBubble,
  Dot,
  ThinkingStatusBar,
  ShiningText,
  GreetingContainer,
  GreetingText,
  SuggestionContainer,
  SuggestionButton,
  ResponseTimeBadge,
  RouteLink,
  AnimatedIcon,
} from '../styles/chatSearchStyles';

interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
  timeMs?: number;
}

const thinkingMessages = ['Pensando . . .', 'Aguarde . . .'];
const SUGGESTIONS = [
  'Localizar inventário?',
  'Como gerar lote?',
  'Como realizar movimentação?'
];
const ROUTE_REGEX = /(\/[a-zA-Z0-9\-\/]+)/g;

const formatDuration = (ms: number): string => {
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

const renderWithRoutes = (text: string) =>
  text
    .split(ROUTE_REGEX)
    .map((part, i) => {
      if (!ROUTE_REGEX.test(part)) return part

      // extrai só o "slug" após a última "/"
      const slug = part.replace(/\/+$/, '').split('/').pop()!

      return (
        <RouteLink key={i} to={part}>
          {slug}
        </RouteLink>
      )
    })

const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext)!;
  const containerRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const startRef = useRef<number>(0);

  const placeholders = [
    'Localize funcionalidades...',
    'Como acessar o inventário?',
    'Como gerar QRCode?',
    'Precisa de ajuda? Pergunte aqui!',
  ];
  const [phIndex, setPhIndex] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setPhIndex(i => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isThinking) return;
    const iv = window.setInterval(() => {
      setThinkingIndex(i => (i + 1) % thinkingMessages.length);
    }, 10000);
    return () => window.clearInterval(iv);
  }, [isThinking]);

  const sendMessage = async (txt: string) => {
    setInputValue('');
    setMessages(m => [...m, { from: 'user', text: txt }]);
    setIsThinking(true);
    startRef.current = performance.now();

    const resp = await dispatch(sendChatMessageThunk({ message: txt }));
    if (sendChatMessageThunk.fulfilled.match(resp)) {
      const { response } = resp.payload as { response: string };
      const delta = performance.now() - startRef.current;
      setMessages(m => [...m, { from: 'bot', text: response, timeMs: delta }]);
    }
    setIsThinking(false);
  };

  const handleSend = () => {
    if (inputValue.trim()) sendMessage(inputValue.trim());
  };

  const handleSuggestion = (s: string) => sendMessage(s);

  return (
    <ChatSearchContainer ref={containerRef} expanded={expanded}>
      <IconContainer>
        <AnimatedIcon />
      </IconContainer>

      <ChatSearchWrapper expanded={expanded}>
        <ChatSearchInput
          placeholder={placeholders[phIndex]}
          onFocus={() => setExpanded(true)}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
      </ChatSearchWrapper>

      {expanded && (
        <ChatSearchBody>
          <ChatSearchMessagesWrapper>
            {messages.length === 0 && !isThinking ? (
              <GreetingContainer>
                <GreetingText>
                  Olá {user?.name.split(' ')[0]}!<br/>
                  O que posso fazer por você?
                </GreetingText>
                <SuggestionContainer>
                  {SUGGESTIONS.map(s => (
                    <SuggestionButton key={s} onClick={() => handleSuggestion(s)}>
                      {s}
                    </SuggestionButton>
                  ))}
                </SuggestionContainer>
              </GreetingContainer>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <ChatMessageContainer key={idx} isUser={msg.from === 'user'}>
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
              </>
            )}
          </ChatSearchMessagesWrapper>

          {isThinking && (
            <ThinkingStatusBar>
              <ShiningText>
                {thinkingMessages[thinkingIndex]}
              </ShiningText>
            </ThinkingStatusBar>
          )}
        </ChatSearchBody>
      )}
    </ChatSearchContainer>
  );
};

export default ChatSearch;
