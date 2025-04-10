import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

import { sendChatMessageThunk } from 'store/slices/chatSlice';
import { ChatMessage } from 'types/chat/ChatMessageDTO';

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
} from '../styles/chatStyles';

const thinkingMessages = ['Pensando . . .', 'Aguarde . . .'];

const ChatUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isThinking]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (isThinking) {
      interval = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % thinkingMessages.length);
      }, 2000);
    } else {
      setThinkingIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isThinking]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    // Adiciona a mensagem do usuário
    setChatHistory((prev) => [...prev, { from: 'user', text: message }]);
    setMessage('');
    setIsThinking(true);

    const responseAction = await dispatch(sendChatMessageThunk({ message }));
    if (sendChatMessageThunk.fulfilled.match(responseAction)) {
      const payload = responseAction.payload as { response: string };
      setChatHistory((prev) => [...prev, { from: 'agent', text: payload.response }]);
    }
    setIsThinking(false);
  };

  return (
    <ChatArea>
      <ChatUIContainer>
        <MessagesContainer>
          {chatHistory.map((msg, idx) => (
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

          {isThinking && (
            <ChatMessageContainer isUser={false}>
              <ChatMessageBot>
                <TypingBubble>
                  <Dot />
                  <Dot />
                  <Dot />
                </TypingBubble>
              </ChatMessageBot>
            </ChatMessageContainer>
          )}

          <div ref={messagesEndRef} />
        </MessagesContainer>

        {isThinking && (
          <ThinkingStatusBar>
            <ShiningText>{thinkingMessages[thinkingIndex]}</ShiningText>
          </ThinkingStatusBar>
        )}

        <ChatFooterContainer>
          <ChatInput
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <ChatButton onClick={handleSend}>Enviar</ChatButton>
        </ChatFooterContainer>
      </ChatUIContainer>
    </ChatArea>
  );
};

export default ChatUI;
