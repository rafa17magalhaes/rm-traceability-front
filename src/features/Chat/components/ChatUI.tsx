import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { sendChatMessageThunk } from 'store/slices/chatSlice';
import { ChatResponseDTO } from 'types/chat';

import {
  ChatContainer,
  ChatHeader,
  ChatTitle,
  ChatBody,
  ChatFooter,
  ChatInput,
  ChatButton,
  ChatMessageContainer,
  ChatMessageUser,
  ChatMessageBot,
} from '../styles/chatStyles';

interface ChatMessage {
  from: 'user' | 'agent'; 
  text: string;
}

const ChatUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Adiciona a pergunta do usuário ao histórico local
    setChatHistory((prev) => [...prev, { from: 'user', text: message }]);

    // Chama a thunk para enviar ao back-end
    const responseAction = await dispatch(sendChatMessageThunk({ message }));
    if (sendChatMessageThunk.fulfilled.match(responseAction)) {
      const payload = responseAction.payload as ChatResponseDTO;
      setChatHistory((prev) => [...prev, { from: 'agent', text: payload.response }]);
    }

    setMessage('');
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Assistente IA</ChatTitle>
      </ChatHeader>

      <ChatBody>
        {chatHistory.length === 0 && (
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Nenhuma mensagem ainda.
          </p>
        )}
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
      </ChatBody>

      <ChatFooter>
        <ChatInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua mensagem..."
        />
        <ChatButton onClick={handleSend}>Enviar</ChatButton>
      </ChatFooter>
    </ChatContainer>
  );
};

export default ChatUI;
