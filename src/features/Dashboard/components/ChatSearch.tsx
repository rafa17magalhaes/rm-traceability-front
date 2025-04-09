import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'store/hooks';
import { sendChatMessageThunk } from 'store/slices/chatSlice';
import { ChatResponseDTO } from 'types/chat';

import { FaComment } from 'react-icons/fa';
import {
  ChatSearchWrapper,
  ChatSearchBar,
  ChatSearchInput,
  ChatIcon,
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

const placeholders = [
  'Localize funcionalidades...',
  'Ex: Como acessar o inventário?',
  'Precisa de ajuda? Pergunte aqui!',
];

const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Rotaciona placeholders a cada 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fecha se clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text: inputValue }]);
    const responseAction = await dispatch(sendChatMessageThunk({ message: inputValue }));
    if (sendChatMessageThunk.fulfilled.match(responseAction)) {
      const payload = responseAction.payload as ChatResponseDTO;
      setMessages((prev) => [...prev, { from: 'bot', text: payload.response }]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatSearchWrapper ref={containerRef}>
      <ChatSearchBar expanded={expanded} onClick={() => setExpanded(true)}>
        {/* Ícone opcional à esquerda */}
        <ChatIcon>
          <FaComment />
        </ChatIcon>

        <ChatSearchInput
          placeholder={placeholders[placeholderIndex]}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setExpanded(true)}
        />
      </ChatSearchBar>

      {expanded && (
        <ChatSearchBody>
          <ChatSearchMessagesWrapper>
            {messages.length === 0 ? (
              <p style={{ color: '#666', fontSize: '0.85rem' }}>
                Nenhuma mensagem ainda. Pergunte algo!
              </p>
            ) : (
              messages.map((msg, idx) => (
                <ChatMessageContainer key={idx} isUser={msg.from === 'user'}>
                  {msg.from === 'user' ? (
                    <ChatMessageUser>
                      <strong>Você:</strong> {msg.text}
                    </ChatMessageUser>
                  ) : (
                    <ChatMessageBot>
                      <strong>Bot:</strong> {msg.text}
                    </ChatMessageBot>
                  )}
                </ChatMessageContainer>
              ))
            )}
          </ChatSearchMessagesWrapper>
        </ChatSearchBody>
      )}
    </ChatSearchWrapper>
  );
};

export default ChatSearch;
