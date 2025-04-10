import React, { useState, useEffect, useRef } from 'react';
import { BsStars } from 'react-icons/bs';
import { useAppDispatch } from 'store/hooks';
import { sendChatMessageThunk } from 'store/slices/chatSlice';

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
} from '../styles/chatSearchStyles';

interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
}

const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Alterna placeholders a cada 3s
  const placeholders = [
    'Localize funcionalidades...',
    'Como acessar o inventário?',
    'Como gerar QRCode?',
    'Precisa de ajuda? Pergunte aqui!',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Fecha se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enviar mensagem
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Mensagem do usuário
    setMessages((prev) => [...prev, { from: 'user', text: inputValue }]);

    // Envia ao backend via Redux Thunk
    const responseAction = await dispatch(sendChatMessageThunk({ message: inputValue }));
    if (sendChatMessageThunk.fulfilled.match(responseAction)) {
      const payload = responseAction.payload as { response: string; session_id?: string };
      setMessages((prev) => [...prev, { from: 'bot', text: payload.response }]);
    }
    setInputValue('');
  };

  // Ao pressionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleFocus = () => {
    setExpanded(true);
  };

  return (
    <ChatSearchContainer ref={containerRef} expanded={expanded}>
      <IconContainer>
        <BsStars />
      </IconContainer>

      <ChatSearchWrapper expanded={expanded}>
        <ChatSearchInput
          placeholder={placeholders[placeholderIndex]}
          onFocus={handleFocus}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </ChatSearchWrapper>

      {expanded && (
        <ChatSearchBody>
          <ChatSearchMessagesWrapper>
            {messages.length === 0 && (
              <p style={{ color: '#666', fontSize: '0.85rem' }}>
                Nenhuma mensagem ainda. Pergunte algo!
              </p>
            )}
            {messages.map((msg, idx) => (
              <ChatMessageContainer key={idx} isUser={msg.from === 'user'}>
                {msg.from === 'user' ? (
                  <ChatMessageUser>
                    <strong>Você:</strong> {msg.text}
                  </ChatMessageUser>
                ) : (
                  <ChatMessageBot>
                    <strong>Agente IA:</strong> {msg.text}
                  </ChatMessageBot>
                )}
              </ChatMessageContainer>
            ))}
          </ChatSearchMessagesWrapper>
        </ChatSearchBody>
      )}
    </ChatSearchContainer>
  );
};

export default ChatSearch;
